# Google Drive Library for NestJS

This library provides a NestJS module for interacting with Google Drive. It includes a service for uploading and retrieving images.

## Installation

Install the library with npm:

```bash
npm install nestjs-googledrive-upload
```

## Usage

First, import `GoogleDriveModule` into your module:

```ts
import { GoogleDriveModule, GoogleDriveConfig } from 'nestjs-googledrive-upload';
```

Watch this [video](https://youtu.be/-YZRkIbNWY0?t=43) for check how to get your Google Drive config.

```ts
import { GoogleDriveModule, GoogleDriveConfig } from 'nestjs-googledrive-upload';

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

And change in your `tsconfig`
```json
"compilerOptions": {
    "resolveJsonModule": true,
  }
```

## .register

```ts
import * as config from 'src/testdir/config.json';

@Module({
  imports: [
    GoogleDriveModule.register(config as GoogleDriveConfig, 'your-google-drive-folder-id'),
  ],
})
```
## .registerAsync

The `registerAsync` method in the `GoogleDriveModule` allows for registering the module asynchronously with the ability to dynamically configure the configuration.

### Syntax

```ts
GoogleDriveModule.registerAsync(options: GoogleDriveModuleAsyncOptions): DynamicModule
```

Parameters:
- options (GoogleDriveModuleAsyncOptions): The options object for asynchronously registering the module. It contains the following properties:
- imports (optional): An array of NestJS modules that need to be imported before creating the GoogleDriveModule module.
- useFactory: The function that will be invoked to asynchronously create the configuration. It should return an object configuration or a promise with the configuration object.
- inject (optional): An array of dependencies to be injected into the useFactory function.

### Usage

```ts
import { Module } from '@nestjs/common';
import { GoogleDriveModule } from 'nestjs-googledrive-upload';

@Module({
  imports: [
    GoogleDriveModule.registerAsync({
      imports: [], // Can import other modules if needed
      useFactory: async () => {
        // Your code to asynchronously fetch the configuration
        const config = await fetchConfigFromSomewhere();
        return config;
      },
    }),
  ],
})
export class AppModule {}
```

---

Then, you can use GoogleDriveService in your services:

```ts
import { Injectable } from '@nestjs/common';
import { GoogleDriveService } from 'nestjs-googledrive-upload';

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