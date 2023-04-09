"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const multer_1 = __importStar(require("multer"));
const googleapis_1 = require("googleapis");
const google_auth_library_1 = require("google-auth-library");
const oauth2Client = new google_auth_library_1.OAuth2Client({
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    redirectUri: 'YOUR_REDIRECT_URI'
});
// Sử dụng Multer để cấu hình options cho việc lưu trữ file tạm thời trên server trước khi upload lên Google Drive
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
const upload2 = (0, multer_1.default)({ storage: (0, multer_1.memoryStorage)() });
// Khởi tạo client Google Drive API
const drive = googleapis_1.google.drive({
    version: 'v3',
    auth: oauth2Client
});
// API endpoint để upload file lên Google Drive
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
// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const file = req.file
//     if (!file) {
//       res.status(400).send('No file uploaded')
//     } else {
//       await driveUpload(file)
//       res.send('File uploaded to Google Drive successfully')
//     }
//   } catch (error) {
//     console.log(error)
//     res.status(500).send('Server Error')
//   }
// })
