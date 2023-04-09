import { CloudinaryStorage } from 'multer-storage-cloudinary';
export interface CloudinaryStorageOptions {
    destination: string;
    allowedFormats?: string[];
    cloudinaryConfig?: {
        cloud_name: string;
        api_key: string;
        api_secret: string;
    };
}
/**
 * Creates a new Cloudinary storage instance with the given options
 * @param {CloudinaryStorageOptions} options - the options object for Cloudinary storage
 */
export declare const getCloudinaryStorage: (options: CloudinaryStorageOptions) => CloudinaryStorage;
