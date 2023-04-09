"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryStorage = void 0;
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
 * @param {string} destination - the destination folder for uploaded files
 */
const cloudinaryStorage = (destination, allowedFormats) => {
    const storageOptions = {
        cloudinary: cloudinary_1.v2,
        params: {
            folder: () => `hellocacbantre/${destination}`,
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
            allowed_formats: allowedFormats !== null && allowedFormats !== void 0 ? allowedFormats : [
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
    return new multer_storage_cloudinary_1.CloudinaryStorage(storageOptions);
};
exports.cloudinaryStorage = cloudinaryStorage;
