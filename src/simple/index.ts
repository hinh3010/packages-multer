import multer, { type StorageEngine } from 'multer'
import path from 'path'
import { toSlug } from './../slug/index'

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
export const diskStorage = multer.diskStorage({
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
export const memoryStorage = multer.memoryStorage()

export const multerUpload = (storage: StorageEngine) =>
  multer({
    storage,
    fileFilter,
    limits: { fileSize: fileSizeLimit }
  })
