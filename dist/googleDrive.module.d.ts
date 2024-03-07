import { DynamicModule } from '@nestjs/common';
import { GoogleDriveConfig } from './types';
import { GoogleDriveModuleAsyncOptions } from './types/googleDrive.module.async.interface';
export declare class GoogleDriveModule {
    static register(googleDriveConfig: GoogleDriveConfig, googleDriveFolderId: string): DynamicModule;
    static registerAsync(options: GoogleDriveModuleAsyncOptions): DynamicModule;
}
