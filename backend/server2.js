// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const pdf = require('pdf-parse'); // For extracting text from PDF
// const { Document, Packer, Paragraph } = require('docx'); // For creating Word files

// const app = express();
// const PORT = 5000;

// // Setup multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/pdf-to-word", upload.single("pdf"), async (req, res) => {
//   try {
//     const pdfPath = req.file.path; // Path to the uploaded PDF
//     const pdfData = await fs.promises.readFile(pdfPath);
    
//     // Use pdf-parse to extract text from the PDF
//     const data = await pdf(pdfData);
//     const extractedText = data.text; // Get the extracted text

//     // Create a new Word document and add the extracted text
//     const doc = new Document({
//       sections: [
//         {
//           children: [
//             new Paragraph(extractedText), // Add the extracted text as a paragraph
//           ],
//         },
//       ],
//     });

//     // Define the output file path
//     const outputFilePath = path.join(__dirname, 'extractedText.docx');

//     // Save the document as a .docx file
//     const buffer = await Packer.toBuffer(doc);
//     await fs.promises.writeFile(outputFilePath, buffer);

//     // Send the .docx file as a response
//     res.download(outputFilePath, 'extractedText.docx', (err) => {
//       if (err) {
//         console.error("Error sending file:", err);
//         res.status(500).send("Error generating Word file");
//       }
//     });
//   } catch (error) {
//     console.error("Error converting PDF to Word:", error);
//     res.status(500).send("Error converting PDF to Word");
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// 7777777777
