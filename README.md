# Google Drive Library for NestJS

This library provides a NestJS module for interacting with Google Drive. It includes a service for uploading and retrieving images.

## Installation

Install the library with npm:

```bash
npm install nestjs-googledrive
```

## Usage

First, import `GoogleDriveModule` into your module:

import { GoogleDriveModule, GoogleDriveConfig } from 'your-library';

```ts
import { GoogleDriveModule, GoogleDriveConfig } from 'nestjs-googledrive';

@Module({
  imports: [
    GoogleDriveModule.register(
      {
        type: '...',
        project_id: '...',
        private_key_id: '...',
        private_key: '...',
        client_email: '...',
        client_id: '...',
        auth_uri: '...',
        token_uri: '...',
        auth_provider_x509_cert_url: '...',
        client_x509_cert_url: '...',
        universe_domain: '...',
      } as GoogleDriveConfig,
      'your-google-drive-folder-id',
    ),
    // other modules...
  ],
  // providers, controllers, etc...
})
export class YourModule {}

```
Or you can create json config file like below

Google Drive API example
```json
{
  "type": "...",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "...",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "...",
  "token_uri": "...",
  "auth_provider_x509_cert_url": "...",
  "client_x509_cert_url": "...",
  "universe_domain": "..."
}
```


And import like this 

```ts
import * as config from 'src/testdir/config.json';

@Module({
  imports: [
    GoogleDriveModule.register(config as GoogleDriveConfig, 'your-google-drive-folder-id'),
  ],
})
```

Then, you can use GoogleDriveService in your services:

```ts
import { Injectable } from '@nestjs/common';
import { GoogleDriveService } from 'nestjs-googledrive';

@Injectable()
export class YourService {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

  public async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      const link = await this.googleDriveService.uploadImage(file);
      // do something with the link, e.g., save it to the database
      return link;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getImage(fileId: string): Promise<string> {
    try {
      const link = await this.googleDriveService.getImage(fileId);
      // do something with the link, e.g., return it to the user
      return link;
    } catch (e) {
      throw new Error(e);
    }
  }
}

```