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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const simple_1 = require("./../simple");
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cloudinaryStorage_1 = require("./../simple/cloudinaryStorage");
const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production.env' : 'dev.env';
dotenv.config({ path: NODE_ENV });
const app = (0, express_1.default)();
const cloudinaryStorage = (0, cloudinaryStorage_1.getCloudinaryStorage)({
    destination: 'my-folder',
    cloudinaryConfig: {
        cloud_name: (_a = process.env.CLOUD_NAME) !== null && _a !== void 0 ? _a : '',
        api_key: (_b = process.env.API_KEY) !== null && _b !== void 0 ? _b : '',
        api_secret: (_c = process.env.API_SECRET) !== null && _c !== void 0 ? _c : ''
    }
});
app.post('/upload', (0, simple_1.multerUpload)(cloudinaryStorage).single('file'), (req, res) => {
    // Handle the file upload
    console.log('Uploading', req.file);
    res.send('File uploaded successfully');
});
app.post('/upload2', (0, simple_1.multerUpload)(cloudinaryStorage).single('file'), (req, res) => {
    // Handle the file upload
    console.log('Uploading', req.file);
    res.send('File uploaded successfully');
});
app.post('/upload/disk', (0, simple_1.multerUpload)(simple_1.diskStorage).single('file'), (req, res) => {
    // Handle the file upload
    console.log('Uploading', req.file);
    res.send('File uploaded successfully');
});
app.post('/upload/memory', (0, simple_1.multerUpload)(simple_1.memoryStorage).single('file'), (req, res) => {
    // Handle the file upload
    console.log('Uploading', req.file);
    res.send('File uploaded successfully');
});
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
// ts-node-esm src/tests/index.ts
