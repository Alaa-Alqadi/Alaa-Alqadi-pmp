import { useState, useEffect, useCallback } from 'react';
import { AppData, GDriveFolder } from '../types';
import { GOOGLE_CLIENT_ID, GOOGLE_API_KEY, DRIVE_FILE_NAME } from '../constants';

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

export type GDriveUser = {
    name: string;
    email: string;
    picture: string;
}

export type GDriveFile = {
    id: string;
    content: AppData;
}

declare global {
    interface Window {
        gapi: any;
        google: any;
    }
}

export const useGoogleDrive = () => {
    const [isGapiReady, setIsGapiReady] = useState(false);
    const [isGsiReady, setIsGsiReady] = useState(false);
    const [isPickerReady, setIsPickerReady] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userProfile, setUserProfile] = useState<GDriveUser | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [tokenClient, setTokenClient] = useState<any>(null);

    useEffect(() => {
        const scriptGapi = document.createElement('script');
        scriptGapi.src = 'https://apis.google.com/js/api.js';
        scriptGapi.async = true;
        scriptGapi.defer = true;
        scriptGapi.onload = () => window.gapi.load('client:picker', gapiInit);
        document.body.appendChild(scriptGapi);

        const scriptGsi = document.createElement('script');
        scriptGsi.src = 'https://accounts.google.com/gsi/client';
        scriptGsi.async = true;
        scriptGsi.defer = true;
        scriptGsi.onload = gsiInit;
        document.body.appendChild(scriptGsi);

        return () => {
            document.body.removeChild(scriptGapi);
            document.body.removeChild(scriptGsi);
        }
    }, []);

    const gapiInit = useCallback(async () => {
        try {
            await window.gapi.client.init({
                apiKey: GOOGLE_API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
            });
            setIsGapiReady(true);
            setIsPickerReady(true);
        } catch (e) {
            setError(e as Error);
        }
    }, []);

    const gsiInit = useCallback(() => {
        try {
            const client = window.google.accounts.oauth2.initTokenClient({
                client_id: GOOGLE_CLIENT_ID,
                scope: SCOPES,
                callback: (tokenResponse: any) => {
                    if (tokenResponse && tokenResponse.access_token) {
                        window.gapi.client.setToken(tokenResponse);
                        setIsSignedIn(true);
                        fetchUserProfile();
                    } else {
                        setError(new Error('Failed to retrieve access token.'));
                    }
                },
            });
            setTokenClient(client);
            setIsGsiReady(true);
        } catch (e) {
             setError(e as Error);
        }
    }, []);
    
    const pickFolder = useCallback((): Promise<GDriveFolder | null> => {
        return new Promise((resolve) => {
            if (!isPickerReady || !isSignedIn) {
                setError(new Error('Picker is not ready or user is not signed in.'));
                resolve(null);
                return;
            }

            const token = window.gapi.client.getToken();
            const view = new window.google.picker.View(window.google.picker.ViewId.FOLDERS);
            view.setMimeTypes('application/vnd.google-apps.folder');

            const picker = new window.google.picker.PickerBuilder()
                .addView(view)
                .setTitle('Select a folder to sync project data')
                .setOAuthToken(token.access_token)
                .setDeveloperKey(GOOGLE_API_KEY)
                .setCallback((data: any) => {
                    if (data[window.google.picker.Action.PICKED]) {
                        const doc = data[window.google.picker.Response.DOCUMENTS][0];
                        resolve({ id: doc.id, name: doc.name });
                    } else if (data[window.google.picker.Action.CANCEL]) {
                        resolve(null);
                    }
                })
                .build();
            picker.setVisible(true);
        });
    }, [isPickerReady, isSignedIn]);

    const fetchUserProfile = useCallback(async () => {
        try {
            const response = await window.gapi.client.oauth2.userinfo.get();
            setUserProfile({
                name: response.result.name,
                email: response.result.email,
                picture: response.result.picture,
            });
        } catch (e) {
            setError(e as Error);
        }
    }, []);


    const signIn = useCallback(() => {
        if (tokenClient) {
            tokenClient.requestAccessToken();
        } else {
            setError(new Error('Google Sign-In is not ready.'));
        }
    }, [tokenClient]);

    const signOut = useCallback(() => {
        const token = window.gapi.client.getToken();
        if (token) {
            window.google.accounts.oauth2.revoke(token.access_token, () => {});
            window.gapi.client.setToken(null);
        }
        setIsSignedIn(false);
        setUserProfile(null);
    }, []);
    
    const getFileId = useCallback(async (folderId: string): Promise<string | null> => {
        try {
            const response = await window.gapi.client.drive.files.list({
                q: `name='${DRIVE_FILE_NAME}' and '${folderId}' in parents and trashed = false`,
                fields: 'files(id, name)',
            });
            if (response.result.files && response.result.files.length > 0) {
                return response.result.files[0].id;
            }
            return null;
        } catch (e) {
            setError(e as Error);
            return null;
        }
    }, []);

    const loadFile = useCallback(async (folderId: string): Promise<GDriveFile | null> => {
        const fileId = await getFileId(folderId);
        if (!fileId) return null;

        try {
            const response = await window.gapi.client.drive.files.get({
                fileId: fileId,
                alt: 'media',
            });
            return { id: fileId, content: response.result as AppData };
        } catch (e) {
            setError(e as Error);
            return null;
        }
    }, [getFileId]);

    const saveFile = useCallback(async (content: AppData, folderId: string, fileId: string | null): Promise<string | null> => {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
        
        const metadata = {
            'name': DRIVE_FILE_NAME,
            'mimeType': 'application/json',
            'parents': fileId ? undefined : [folderId],
        };

        const multipartRequestBody =
            delimiter +
            'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(content) +
            close_delim;
        
        try {
            const path = fileId 
                ? `/upload/drive/v3/files/${fileId}` 
                : '/upload/drive/v3/files';

            const method = fileId ? 'PATCH' : 'POST';
            
            const request = window.gapi.client.request({
                'path': path,
                'method': method,
                'params': { uploadType: 'multipart', fields: 'id' },
                'headers': {
                    'Content-Type': 'multipart/related; boundary="' + boundary + '"',
                },
                'body': multipartRequestBody
            });

            const response = await request;
            return response.result.id;
        } catch (e) {
            setError(e as Error);
            return null;
        }

    }, []);

    return { 
        isReady: isGapiReady && isGsiReady && isPickerReady, 
        isSignedIn, 
        userProfile,
        error, 
        signIn, 
        signOut,
        pickFolder,
        loadFile,
        saveFile,
    };
};