import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 } from 'cloudinary'
import path from 'path'
import { toSlug } from '../slug'

/**
 * Configures Cloudinary credentials for v2 of the API
 */
v2.config({
  cloud_name: 'dqmv3pllu',
  api_key: '947637492891922',
  api_secret: 'AoGygICiHJ8yvjJ10TbqvQmSS-E'
})

/**
 * Creates a new Cloudinary storage instance with the given options
 * @param {string} destination - the destination folder for uploaded files
 */
export const cloudinaryStorage = (destination: string, allowedFormats?: string[]) => {
  const storageOptions = {
    cloudinary: v2,
    params: {
      folder: () => `hellocacbantre/${destination}`,
      format: (_req: any, file: any) => path.extname(file.originalname).slice(1),
      public_id: (req: any, file: { originalname: string; fieldname: string }) => {
        const originalnameSlug = toSlug(file.originalname)
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        const fileName = `${originalnameSlug}-${uniqueSuffix}-${file.fieldname}`
        return fileName
      },
      transformation: [
        {
          width: 1000,
          crop: 'limit'
        }
      ],
      allowed_formats: allowedFormats ?? [
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
  }

  return new CloudinaryStorage(storageOptions)
}
