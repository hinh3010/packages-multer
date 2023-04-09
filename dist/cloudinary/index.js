"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerCloudinary = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = require("cloudinary");
const path_1 = __importDefault(require("path"));
/**
 * Configures Cloudinary credentials for v2 of the API
 */
cloudinary_1.v2.config({
    cloud_name: 'dqmv3pllu',
    api_key: '947637492891922',
    api_secret: 'AoGygICiHJ8yvjJ10TbqvQmSS-E'
});
/**
 * Creates a new Cloudinary storage instance with the given options
 */
const storageOptions = {
    cloudinary: cloudinary_1.v2,
    params: {
        folder: () => 'hellocacbantre',
        format: (_req, file) => path_1.default.extname(file.originalname).slice(1),
        public_id: (req, file) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const fileExt = path_1.default.extname(file.originalname);
            const fileName = `${uniqueSuffix}-${file.fieldname}${fileExt}`;
            return fileName;
        },
        transformation: [
            {
                width: 1000,
                crop: 'limit'
            }
        ],
        allowed_formats: [
            'jpg',
            'jpeg',
            'png',
            'gif',
            'bmp',
            'tiff',
            'svg',
            'webp',
            'pdf',
            'doc',
            'docx',
            'ppt',
            'pptx',
            'xls',
            'xlsx',
            'txt',
            'rtf',
            'csv',
            'odf',
            'odp',
            'ods',
            'odt',
            'mp3',
            'mp4',
            'wav',
            'flac',
            'aac',
            'ogg'
        ]
    }
};
const cloudinaryStorage = new multer_storage_cloudinary_1.CloudinaryStorage(storageOptions);
/**
 * The file filter function used by Multer to filter files to be uploaded.
 */
const fileFilter = (_req, file, cb) => {
    cb(null, true);
};
const fileSizeLimit = 1 * 1024 * 1024 * 1024; // 1GB
/**
 * Creates a new Multer upload instance with the Cloudinary storage
 */
exports.multerCloudinary = (0, multer_1.default)({
    storage: cloudinaryStorage,
    fileFilter,
    limits: { fileSize: fileSizeLimit }
});
