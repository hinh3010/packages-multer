import multer, { type StorageEngine } from 'multer';
/**
 * The Disk Storage engine used by Multer to upload files to disk.
 */
export declare const diskStorage: multer.StorageEngine;
/**
 * The Memory Storage engine used by Multer to upload files to memory.
 */
export declare const memoryStorage: multer.StorageEngine;
export declare const multerUpload: (storage: StorageEngine) => multer.Multer;
