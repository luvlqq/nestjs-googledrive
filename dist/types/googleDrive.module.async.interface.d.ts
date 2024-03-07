import { ModuleMetadata } from '@nestjs/common';
import { GoogleDriveConfig } from './googleDriveConfig';
export interface GoogleDriveModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => GoogleDriveConfig | Promise<GoogleDriveConfig>;
    inject?: any[];
}
