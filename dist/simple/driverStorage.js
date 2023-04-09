"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("@google-cloud/storage");
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const storage = new storage_1.Storage({
    // TODO: Thay thế bằng đường dẫn đến tệp .json chứa thông tin xác thực
    keyFilename: '/path/to/keyfile.json',
    projectId: 'your-project-id'
});
const bucket = storage.bucket('your-bucket-name');
const multerUpload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // giới hạn kích thước tệp tối đa là 5MB
    }
});
function uploadFile(req, res, next) {
    const file = req.file;
    if (!file) {
        return next(new Error('Không tìm thấy tệp'));
    }
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
        resumable: false
    });
    blobStream.on('error', (err) => {
        next(err);
    });
    blobStream.on('finish', () => {
        // Đặt quyền truy cập tệp để ai cũng có thể xem
        void blob.makePublic().then(() => {
            file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            next();
        });
    });
    blobStream.end(file.buffer);
}
function uploadMiddleware(req, res, next) {
    multerUpload.single('file')(req, res, (err) => {
        if (err) {
            return next(err);
        }
        uploadFile(req, res, next);
    });
}
const app = (0, express_1.default)();
app.post('/upload', uploadMiddleware, (req, res) => {
    const file = req.file;
    res.send({
        cloudStoragePublicUrl: file.cloudStoragePublicUrl
    });
});
