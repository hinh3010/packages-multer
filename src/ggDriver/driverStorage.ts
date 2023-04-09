import { Storage } from '@google-cloud/storage'
import { type NextFunction, type Request, type Response } from 'express'
import multer from 'multer'

interface CustomFile extends Express.Multer.File {
  cloudStoragePublicUrl?: string
}

const storage = new Storage({
  // TODO: Thay thế bằng đường dẫn đến tệp .json chứa thông tin xác thực
  keyFilename: 'src/hellocacbantre-383207-0e4d9aad05f0.json',
  projectId: 'hellocacbantre-383207'
})

const bucket = storage.bucket('your-bucket-name')
const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // giới hạn kích thước tệp tối đa là 5MB
  }
})

function uploadFile(req: Request, res: Response, next: NextFunction) {
  const file = req.file as CustomFile

  if (!file) {
    return next(new Error('Không tìm thấy tệp'))
  }

  const blob = bucket.file(file.originalname)

  const blobStream = blob.createWriteStream({
    resumable: false
  })

  blobStream.on('error', (err) => {
    next(err)
  })

  blobStream.on('finish', () => {
    // Đặt quyền truy cập tệp để ai cũng có thể xem
    void blob.makePublic().then(() => {
      file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      next()
    })
  })

  blobStream.end(file.buffer)
}

export function uploadMiddleware(req: Request, res: Response, next: NextFunction) {
  multerUpload.single('file')(req, res, (err) => {
    if (err) {
      return next(err)
    }

    uploadFile(req, res, next)
  })
}
