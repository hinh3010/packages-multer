"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCloudinaryStorage = void 0;
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = require("cloudinary");
const path_1 = __importDefault(require("path"));
const slug_1 = require("../slug");
/**
 * Creates a new Cloudinary storage instance with the given options
 * @param {CloudinaryStorageOptions} options - the options object for Cloudinary storage
 */
const getCloudinaryStorage = (options) => {
    const { destination, allowedFormats, cloudinaryConfig } = options;
    // Configure Cloudinary credentials
    if (!cloudinaryConfig) {
        throw new Error('Cloudinary credentials must be provided in cloudinaryConfig');
    }
    cloudinary_1.v2.config(cloudinaryConfig);
    const storageOptions = {
        cloudinary: cloudinary_1.v2,
        params: {
            folder: () => `hellocacbantre/${destination}`,
            format: (_req, file) => path_1.default.extname(file.originalname).slice(1),
            public_id: (req, file) => {
                const originalnameSlug = (0, slug_1.toSlug)(file.originalname);
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const fileName = `${originalnameSlug}-${uniqueSuffix}-${file.fieldname}`;
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
exports.getCloudinaryStorage = getCloudinaryStorage;
