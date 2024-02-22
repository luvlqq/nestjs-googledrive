/// <reference types="multer" />
import { GoogleDriveConfig } from './types';
export declare class GoogleDriveService {
    private config;
    private googleDriveFolderId;
    private drive;
    constructor(config: GoogleDriveConfig, googleDriveFolderId: string);
    uploadImage(file: Express.Multer.File): Promise<string>;
    getImage(fileId: string): Promise<string>;
}
