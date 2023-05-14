import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 } from 'cloudinary'
import path from 'path'
import { toSlug } from '../slug'

export interface CloudinaryStorageOptions {
  destination: string
  allowedFormats?: string[]
  cloudinaryConfig?: {
    cloud_name: string
    api_key: string
    api_secret: string
  }
}

/**
 * Creates a new Cloudinary storage instance with the given options
 * @param {CloudinaryStorageOptions} options - the options object for Cloudinary storage
 */
export const getCloudinaryStorage = (options: CloudinaryStorageOptions) => {
  const { destination, allowedFormats, cloudinaryConfig } = options

  // Configure Cloudinary credentials
  if (!cloudinaryConfig) {
    throw new Error('Cloudinary credentials must be provided in cloudinaryConfig')
  }

  v2.config(cloudinaryConfig)

  const storageOptions = {
    cloudinary: v2,
    params: {
      folder: () => destination,
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
