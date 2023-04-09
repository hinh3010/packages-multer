import { CloudinaryStorage } from 'multer-storage-cloudinary';
/**
 * Creates a new Cloudinary storage instance with the given options
 * @param {string} destination - the destination folder for uploaded files
 */
export declare const cloudinaryStorage: (destination: string, allowedFormats?: string[]) => CloudinaryStorage;
