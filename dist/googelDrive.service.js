"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleDriveService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const buffer_1 = require("buffer");
const stream_1 = require("stream");
const types_1 = require("./types");
let GoogleDriveService = class GoogleDriveService {
    constructor(config, googleDriveFolderId) {
        this.config = config;
        this.googleDriveFolderId = googleDriveFolderId;
        const auth = new googleapis_1.google.auth.GoogleAuth({
            credentials: {
                client_email: this.config.client_email,
                private_key: this.config.private_key,
            },
            scopes: ['https://www.googleapis.com/auth/drive'],
        });
        this.drive = googleapis_1.google.drive({ version: 'v3', auth });
    }
    async uploadImage(file) {
        try {
            const { originalname, buffer } = file;
            const fileBuffer = buffer_1.Buffer.from(buffer);
            const media = {
                mimeType: file.mimetype,
                body: stream_1.Readable.from([fileBuffer]),
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
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async getImage(fileId) {
        try {
            return `https://drive.google.com/uc?id=${fileId}`;
        }
        catch (e) {
            throw new Error(e);
        }
    }
};
exports.GoogleDriveService = GoogleDriveService;
exports.GoogleDriveService = GoogleDriveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CONFIG')),
    __param(1, (0, common_1.Inject)('FOLDERID')),
    __metadata("design:paramtypes", [types_1.GoogleDriveConfig, String])
], GoogleDriveService);
//# sourceMappingURL=googelDrive.service.js.map