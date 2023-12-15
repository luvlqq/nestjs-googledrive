import { Inject, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Buffer } from 'buffer';
import { Readable } from 'stream';
import { GoogleDriveConfig } from './types';

@Injectable()
export class GoogleDriveService {
  private drive;
  constructor(
    @Inject('CONFIG') private config: GoogleDriveConfig,
    @Inject('FOLDERID') private googleDriveFolderId: string,
  ) {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: this.config.client_email,
        private_key: this.config.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    this.drive = google.drive({ version: 'v3', auth });
  }

  /**
   *
   * @param file your upload file like mp3, png, jpeg etc...
   * @return link link four your file on Google Drive
   */
  public async uploadData(file: Express.Multer.File): Promise<string> {
    try {
      const { originalname, buffer } = file;

      const fileBuffer = Buffer.from(buffer);

      const media = {
        mimeType: file.mimetype,
        body: Readable.from([fileBuffer]),
      };

      const driveResponse = await this.drive.files.create({
        requestBody: {
          name: originalname,
          mimeType: file.mimetype,
          parents: [this.googleDriveFolderId],
        },
        media: media,
      });

      const fileId = driveResponse.data.id;
      return `https://drive.google.com/uc?id=${fileId}`;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   * @param fileId your file id which you want to get
   */
  public async getData(fileId: string): Promise<string> {
    try {
      return `https://drive.google.com/uc?id=${fileId}`;
    } catch (e) {
      throw new Error(e);
    }
  }
}
