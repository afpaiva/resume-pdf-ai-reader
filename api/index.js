import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { extractTextFromPdfBuffer, analyzeResumeWithOpenAI } from './handleResume.js';

const app = express();
const port = 4000;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/read', upload.single('pdfFile'), async (req, res) => {

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const dataBuffer = req.file.buffer;
    const text = await extractTextFromPdfBuffer(dataBuffer);
    const analyzedText = await analyzeResumeWithOpenAI(text);    
    res.send(analyzedText);
});

app.listen(port, () => {
    console.log(`Resume Analyzer api listening on port ${port}`);
});
