import express from 'express'
import { multerCloudinary, multerDisk } from '../simple'
import { uploadMiddleware } from '../ggDriver/driverStorage'

const app = express()

app.post('/upload', multerCloudinary('upload').single('file'), (req, res) => {
  // Handle the file upload
  console.log('Uploading', req.file)
  res.send('File uploaded successfully')
})

app.post('/upload/disk', multerDisk.single('file'), (req, res) => {
  // Handle the file upload
  console.log('Uploading', req.file)
  res.send('File uploaded successfully')
})

app.post('/upload/driver', uploadMiddleware, (req, res) => {
  const file = req.file
  res.json({
    file
  })
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})

// ts-node-esm tests/connect.test.ts
