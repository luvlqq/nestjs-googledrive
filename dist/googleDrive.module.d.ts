import { DynamicModule } from '@nestjs/common';
import { GoogleDriveConfig } from './types';
export declare class GoogleDriveModule {
    static register(googleDriveConfig: GoogleDriveConfig, googleDriveFolderId: string): DynamicModule;
}
