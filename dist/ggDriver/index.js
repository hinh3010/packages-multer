"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.driveUpload = void 0;
const googleapis_1 = require("googleapis");
const google_auth_library_1 = require("google-auth-library");
const oauth2Client = new google_auth_library_1.OAuth2Client({
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    redirectUri: 'YOUR_REDIRECT_URI'
});
const drive = googleapis_1.google.drive({
    version: 'v3',
    auth: oauth2Client
});
const driveUpload = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield drive.files.create({
            requestBody: {
                name: file.originalname
            },
            media: {
                body: file.buffer
            }
        });
        console.log(res.data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.driveUpload = driveUpload;
