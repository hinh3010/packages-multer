"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("@google-cloud/storage");
const app = (0, express_1.default)();
// Créer une instance du client Storage
const storage = new storage_1.Storage();
// Configurer l'emplacement de stockage pour les fichiers téléchargés
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // limiter la taille du fichier à 5 Mo
    }
});
// Définir la route pour télécharger un fichier
app.post('/upload', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bucket = storage.bucket('my-bucket');
        const file = bucket.file(req.file.originalname);
        // Créer un flux d'écriture pour stocker le fichier dans Google Cloud Storage
        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });
        // Écrire le contenu du fichier dans le flux d'écriture
        stream.end(req.file.buffer);
        // Envoyer une réponse indiquant que le fichier a été téléchargé avec succès
        res.status(200).send('File uploaded successfully.');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error uploading file.');
    }
}));
// Démarrer le serveur
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
