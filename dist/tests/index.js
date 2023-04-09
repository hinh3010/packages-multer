"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const simple_1 = require("../simple");
const app = (0, express_1.default)();
app.post('/upload', (0, simple_1.multerCloudinary)('upload').single('file'), (req, res) => {
    // Handle the file upload
    console.log('Uploading', req.file);
    res.send('File uploaded successfully');
});
app.post('/upload/disk', simple_1.multerDisk.single('file'), (req, res) => {
    // Handle the file upload
    console.log('Uploading', req.file);
    res.send('File uploaded successfully');
});
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
// ts-node-esm tests/connect.test.ts
