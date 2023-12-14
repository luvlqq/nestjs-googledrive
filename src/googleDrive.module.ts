import { DynamicModule, Module } from '@nestjs/common';
import { GoogleDriveService } from './googelDrive.service';
import { GoogleDriveConfig } from './types';

@Module({})
export class GoogleDriveModule {
  /**
   *
   * @param googleDriveConfig your config file/all config fields
   * @param googleDriveFolderId your Google Drive folder id
   */
  static register(
    googleDriveConfig: GoogleDriveConfig,
    googleDriveFolderId: string,
  ): DynamicModule {
    return {
      module: GoogleDriveModule,
      global: true,
      providers: [
        GoogleDriveService,
        { provide: 'CONFIG', useValue: googleDriveConfig },
        { provide: 'FOLDERID', useValue: googleDriveFolderId },
      ],
      exports: [
        GoogleDriveService,
        { provide: 'CONFIG', useValue: googleDriveConfig },
        { provide: 'FOLDERID', useValue: googleDriveFolderId },
      ],
    };
  }
}
