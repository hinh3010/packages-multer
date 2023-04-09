import { toSlug } from './../slug/index'
import multer from 'multer'
import path from 'path'
import { cloudinaryStorage } from './cloudinaryStorage'

/**
 * The file filter function used by Multer to filter files to be uploaded.
 */
const fileFilter = (_req: any, file: any, cb: any) => {
  cb(null, true)
}

const fileSizeLimit = 1 * 1024 * 1024 * 1024 // 1GB

/**
 * The Disk Storage engine used by Multer to upload files to disk.
 */
const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'src/uploads')
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const fileExt = path.extname(file.originalname)
    const originalnameSlug = toSlug(file.originalname)
    const fileName = `${originalnameSlug}-${uniqueSuffix}-${file.fieldname}${fileExt}`
    cb(null, fileName)
  }
})

/**
 * The Memory Storage engine used by Multer to upload files to memory.
 */
const memoryStorage = multer.memoryStorage()

export const multerDisk = multer({
  storage: diskStorage,
  limits: { fileSize: fileSizeLimit },
  fileFilter
})

export const multerMemory = multer({
  storage: memoryStorage,
  limits: { fileSize: fileSizeLimit },
  fileFilter
})

export const multerCloudinary = (destination: string, allowedFormats?: string[]) =>
  multer({
    storage: cloudinaryStorage(destination, allowedFormats),
    fileFilter,
    limits: { fileSize: fileSizeLimit }
  })
