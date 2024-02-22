"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const googleDrive_module_1 = require("./googleDrive.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(googleDrive_module_1.GoogleDriveModule);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map