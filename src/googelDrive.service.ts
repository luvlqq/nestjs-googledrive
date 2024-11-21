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
  public async uploadImage(file: Express.Multer.File): Promise<string> {
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
        fields: 'id',
      });

      const fileId = driveResponse.data.id;
      const response = await this.drive.files.get({
        fileId: fileId,
        fields: 'id',
      });

      const newFileId = response.data.id;
      return `https://drive.google.com/thumbnail?id=${newFileId}`;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   * @param fileId your file id which you want to get
   */
  public async getImage(fileId: string): Promise<string> {
    try {
      return `https://drive.google.com/thumbnail?id=${fileId}`;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Delete your file from Google Drive.
   * @param fileId your file id
   * */
  /**
   * Delete your file from Google Drive.
   * @param fileId your file id
   */
  public async deleteImage(fileId: string): Promise<boolean> {
    try {
      await this.drive.files.delete({
        fileId: fileId,
      });
      return true;
    } catch (e) {
      throw new Error(`Failed to delete file with ID ${fileId}: ${e.message}`);
    }
  }
}
