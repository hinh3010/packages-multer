import multer from 'multer';
export declare const multerDisk: multer.Multer;
export declare const multerMemory: multer.Multer;
export declare const multerCloudinary: (destination: string) => multer.Multer;
