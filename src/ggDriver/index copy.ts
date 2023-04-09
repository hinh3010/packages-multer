import multer, { memoryStorage } from 'multer'
import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

const oauth2Client = new OAuth2Client({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI'
})

// Sử dụng Multer để cấu hình options cho việc lưu trữ file tạm thời trên server trước khi upload lên Google Drive
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

const upload2 = multer({ storage: memoryStorage() })

// Khởi tạo client Google Drive API
const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})

// API endpoint để upload file lên Google Drive
const driveUpload = async (file: Express.Multer.File) => {
  try {
    const res = await drive.files.create({
      requestBody: {
        name: file.originalname
      },
      media: {
        body: file.buffer
      }
    })
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    if (!file) {
      res.status(400).send('No file uploaded')
    } else {
      await driveUpload(file)
      res.send('File uploaded to Google Drive successfully')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
})
