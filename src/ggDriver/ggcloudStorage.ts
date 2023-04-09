import express from 'express'
import multer from 'multer'
import { Storage } from '@google-cloud/storage'

const app = express()

// Créer une instance du client Storage
const storage = new Storage()

// Configurer l'emplacement de stockage pour les fichiers téléchargés
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // limiter la taille du fichier à 5 Mo
  }
})

// Définir la route pour télécharger un fichier
app.post('/upload', upload.single('file'), async (req: any, res: any) => {
  try {
    const bucket = storage.bucket('my-bucket')
    const file = bucket.file(req.file.originalname)

    // Créer un flux d'écriture pour stocker le fichier dans Google Cloud Storage
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })

    // Écrire le contenu du fichier dans le flux d'écriture
    stream.end(req.file.buffer)

    // Envoyer une réponse indiquant que le fichier a été téléchargé avec succès
    res.status(200).send('File uploaded successfully.')
  } catch (err) {
    console.error(err)
    res.status(500).send('Error uploading file.')
  }
})

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Server started on port 3000')
})
