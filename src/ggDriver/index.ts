import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

const oauth2Client = new OAuth2Client({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI'
})

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})

export const driveUpload = async (file: Express.Multer.File) => {
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
