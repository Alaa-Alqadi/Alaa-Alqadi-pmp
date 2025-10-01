import { useCallback } from 'react';
import { AppData } from '../types';

// Type definitions for File System Access API for broader compatibility
interface FileSystemFileHandle {
  kind: 'file';
  name: string;
  isSameEntry: (other: FileSystemFileHandle) => Promise<boolean>;
  queryPermission: (descriptor?: FileSystemHandlePermissionDescriptor) => Promise<PermissionState>;
  requestPermission: (descriptor?: FileSystemHandlePermissionDescriptor) => Promise<PermissionState>;
  createWritable: () => Promise<FileSystemWritableFileStream>;
  getFile: () => Promise<File>;
}

interface FileSystemWritableFileStream extends WritableStream {
  write: (data: any) => Promise<void>;
  seek: (position: number) => Promise<void>;
  truncate: (size: number) => Promise<void>;
}

interface FileSystemHandlePermissionDescriptor {
  mode?: 'read' | 'readwrite';
}

declare global {
  interface Window {
    showOpenFilePicker: (options?: any) => Promise<FileSystemFileHandle[]>;
  }
}

export const useFileSystemAccess = () => {
    const isSupported = 'showOpenFilePicker' in window;

    const verifyPermission = useCallback(async (fileHandle: FileSystemFileHandle): Promise<boolean> => {
        const options = { mode: 'readwrite' as const };
        if ((await fileHandle.queryPermission(options)) === 'granted') {
            return true;
        }
        if ((await fileHandle.requestPermission(options)) === 'granted') {
            return true;
        }
        return false;
    }, []);

    const pickFile = useCallback(async (): Promise<FileSystemFileHandle | null> => {
        if (!isSupported) return null;
        try {
            const [handle] = await window.showOpenFilePicker({
                types: [{
                    description: 'JSON Files',
                    accept: { 'application/json': ['.json'] }
                }],
            });
            return handle;
        } catch (err) {
            // This error is expected if the user cancels the picker
            if (err instanceof DOMException && err.name === 'AbortError') {
              return null;
            }
            console.error('An unexpected error occurred in the file picker.', err);
            return null;
        }
    }, [isSupported]);
    
    const readFile = useCallback(async (fileHandle: FileSystemFileHandle): Promise<string | null> => {
        try {
            if (!(await verifyPermission(fileHandle))) {
                throw new Error('Permission to read file was not granted.');
            }
            const file = await fileHandle.getFile();
            return await file.text();
        } catch (err) {
            console.error('Error reading file:', err);
            return null;
        }
    }, [verifyPermission]);
    
    const writeFile = useCallback(async (fileHandle: FileSystemFileHandle, contents: AppData): Promise<void> => {
        try {
            if (!(await verifyPermission(fileHandle))) {
                throw new Error('Permission to write file was not granted.');
            }
            const writable = await fileHandle.createWritable();
            await writable.write(JSON.stringify(contents, null, 2));
            await writable.close();
        } catch (err) {
            console.error('Error writing to file:', err);
        }
    }, [verifyPermission]);

    return {
        isSupported,
        pickFile,
        readFile,
        writeFile,
    };
};
