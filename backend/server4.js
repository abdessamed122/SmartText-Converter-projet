const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const PORT = 5000;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Adjust the path if needed
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Store the file with its original name
    },
});

const upload = multer({ storage: storage });

// Endpoint to convert PDF to Word
app.post('/convert-pdf-to-word', upload.single('file'), async (req, res) => {
    try {
        const data = new FormData();
        data.append('file', fs.createReadStream(req.file.path));

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.pdfrest.com/word',
            headers: {
                'Api-Key': '8c90ae12-927d-4460-8448-c9e00378e38b', // Replace with your actual API key
                ...data.getHeaders(),
            },
            data: data,
        };

        const response = await axios(config);
        res.json({ outputUrl: response.data.outputUrl });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to convert PDF to Word' });
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
