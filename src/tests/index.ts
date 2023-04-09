import { diskStorage, memoryStorage, multerUpload } from './../simple'
import * as dotenv from 'dotenv'
import express from 'express'
import { getCloudinaryStorage } from './../simple/cloudinaryStorage'

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production.env' : 'dev.env'
dotenv.config({ path: NODE_ENV })

const app = express()

const cloudinaryStorage = getCloudinaryStorage({
  destination: 'my-folder',
  cloudinaryConfig: {
    cloud_name: process.env.CLOUD_NAME ?? '',
    api_key: process.env.API_KEY ?? '',
    api_secret: process.env.API_SECRET ?? ''
  }
})

app.post('/upload', multerUpload(cloudinaryStorage).single('file'), (req, res) => {
  // Handle the file upload
  console.log('Uploading', req.file)
  res.send('File uploaded successfully')
})

app.post('/upload2', multerUpload(cloudinaryStorage).single('file'), (req, res) => {
  // Handle the file upload
  console.log('Uploading', req.file)
  res.send('File uploaded successfully')
})

app.post('/upload/disk', multerUpload(diskStorage).single('file'), (req, res) => {
  // Handle the file upload
  console.log('Uploading', req.file)
  res.send('File uploaded successfully')
})

app.post('/upload/memory', multerUpload(memoryStorage).single('file'), (req, res) => {
  // Handle the file upload
  console.log('Uploading', req.file)
  res.send('File uploaded successfully')
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})

// ts-node-esm src/tests/index.ts
