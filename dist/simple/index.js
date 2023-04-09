"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerCloudinary = exports.multerMemory = exports.multerDisk = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinaryStorage_1 = require("./cloudinaryStorage");
/**
 * The file filter function used by Multer to filter files to be uploaded.
 */
const fileFilter = (_req, file, cb) => {
    cb(null, true);
};
const fileSizeLimit = 1 * 1024 * 1024 * 1024; // 1GB
/**
 * The Disk Storage engine used by Multer to upload files to disk.
 */
const diskStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'src/uploads');
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const fileExt = path_1.default.extname(file.originalname);
        const fileName = `${uniqueSuffix}-${file.fieldname}${fileExt}`;
        cb(null, fileName);
    }
});
/**
 * The Memory Storage engine used by Multer to upload files to memory.
 */
const memoryStorage = multer_1.default.memoryStorage();
exports.multerDisk = (0, multer_1.default)({
    storage: diskStorage,
    limits: { fileSize: fileSizeLimit },
    fileFilter
});
exports.multerMemory = (0, multer_1.default)({
    storage: memoryStorage,
    limits: { fileSize: fileSizeLimit },
    fileFilter
});
const multerCloudinary = (destination) => (0, multer_1.default)({
    storage: (0, cloudinaryStorage_1.cloudinaryStorage)(destination),
    fileFilter,
    limits: { fileSize: fileSizeLimit }
});
exports.multerCloudinary = multerCloudinary;
