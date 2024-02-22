"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GoogleDriveModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleDriveModule = void 0;
const common_1 = require("@nestjs/common");
const googelDrive_service_1 = require("./googelDrive.service");
let GoogleDriveModule = GoogleDriveModule_1 = class GoogleDriveModule {
    static register(googleDriveConfig, googleDriveFolderId) {
        return {
            module: GoogleDriveModule_1,
            global: true,
            providers: [
                googelDrive_service_1.GoogleDriveService,
                { provide: 'CONFIG', useValue: googleDriveConfig },
                { provide: 'FOLDERID', useValue: googleDriveFolderId },
            ],
            exports: [
                googelDrive_service_1.GoogleDriveService,
                { provide: 'CONFIG', useValue: googleDriveConfig },
                { provide: 'FOLDERID', useValue: googleDriveFolderId },
            ],
        };
    }
};
exports.GoogleDriveModule = GoogleDriveModule;
exports.GoogleDriveModule = GoogleDriveModule = GoogleDriveModule_1 = __decorate([
    (0, common_1.Module)({})
], GoogleDriveModule);
//# sourceMappingURL=googleDrive.module.js.map