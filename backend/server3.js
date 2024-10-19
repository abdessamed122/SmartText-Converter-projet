const express = require('express');
const Tesseract = require('tesseract.js');
const multer = require('multer');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const cors = require('cors'); // استيراد مكتبة CORS

const app = express();
const PORT = 5000;
app.use(express.json()); // Make sure to parse JSON body
// إعداد CORS للسماح بكل الأصول (يمكن تخصيصها حسب الحاجة)
app.use(cors({
  origin: 'http://localhost:5173', // مثال: السماح بطلبات من هذا العنوان فقط
  methods: ['GET', 'POST'], // تحديد الطرق المسموح بها
  credentials: true // السماح بالكوكيز إذا لزم الأمر
}));

const ApiKey = "AIzaSyCMoofI5sXPIrmxvNPSVl9VCsFkxFp7GkU";
const genAI = new GoogleGenerativeAI(ApiKey);
// تحقق من وجود مجلد 'uploads' وإذا لم يكن موجودًا، قم بإنشائه
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// إعداد multer لحفظ الملفات المرفوعة
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// دالة لاستخراج النص من الصورة
async function extractTextFromImage(imagePath, language) {
  try {
    
    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      language,
      {
        logger: m => console.log(m),
        tessedit_pageseg_mode: 1 // ضبط PSM ليكون أكثر ملائمة للنص
      }
    );
    return text;
 } catch (error) {
    console.error("Error extracting text from image:", error);
    throw new Error("Failed to extract text from image");
  }
}

// المسار الذي يستقبل طلب POST
app.post('/extract-text', upload.single('image'), async (req, res) => { 
 
  try {
   const imagePath = req.file.path; // الحصول على مسار الصورة المرفوعة
  const language = req.body.text;
      const extractedText = await extractTextFromImage(imagePath, language);
          res.send({ extractedText });
   
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


// ----------------------- sporte all type 

app.post("/extract-text-ai", upload.single('image'), async (req, res) => {
  async function extractTextFromImage2() {
    try {
      const image = req.file; // الحصول على الملف المرفوع
      const format = req.body.format; // نتوقع صيغة الصورة من جسم الطلب
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      if (!image) {
        throw new Error("لم يتم تحميل الصورة بشكل صحيح");
      }

      const imagePath = image.path; // استخدم مسار الملف المرفوع
      const imageData = fs.readFileSync(imagePath);
      const base64Image = Buffer.from(imageData).toString("base64");

      const result = await model.generateContent([
        "Extract the text in the photo",
        {
          inlineData: {
            data: base64Image,
            mimeType: getMimeType(format) // الحصول على نوع mime الصحيح
          }
        }
      ]);

      const extractedText = result.response.text();
      res.json({ text: extractedText }); // إرجاع نص كـ JSON

      return extractedText;
    } catch (error) {
      console.error("Error extracting text from image:", error);
      throw error;
    }
  }

  extractTextFromImage2()

});

//-----------------------------------------------------------------------------------------------------
// تعديل المسار ليعمل مع الملفات المرفوعة
app.post("/extract-text-summarize-ai", upload.single('image'), async (req, res) => {
  async function extractTextFromImage() {
    try {
      const image = req.file; // الحصول على الملف المرفوع
      const format = req.body.format; // نتوقع صيغة الصورة من جسم الطلب
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      if (!image) {
        throw new Error("لم يتم تحميل الصورة بشكل صحيح");
      }

      const imagePath = image.path; // استخدم مسار الملف المرفوع
      const imageData = fs.readFileSync(imagePath);
      const base64Image = Buffer.from(imageData).toString("base64");

      const result = await model.generateContent([
        "Extract the text in the photo",
        {
          inlineData: {
            data: base64Image,
            mimeType: getMimeType(format) // الحصول على نوع mime الصحيح
          }
        }
      ]);

      const extractedText = result.response.text();
      return extractedText;
    } catch (error) {
      console.error("Error extracting text from image:", error);
      throw error;
    }
  }

  async function summarizeText(text) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Translate a text to me in English:" + text;
      // Translate a text to me in English
      // Summarize this text with Same language as written:
      const result = await model.generateContent(prompt);

      const summary = result.response.text();
      res.send({ Summary: summary });
      return summary;
    } catch (error) {
      console.error("Error summarizing text:", error);
    }
  }

  async function run() {
    const extractedText = await extractTextFromImage();
    if (extractedText) {
      await summarizeText(extractedText);
    }
  }

  run();
});

// دالة مساعدة لتحديد نوع MIME
function getMimeType(format) {
  const mimeTypes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    jfif: 'image/jpeg',
    heic: 'image/heic',
    pdf: 'application/pdf'
  };
  return mimeTypes[format.toLowerCase()] || 'application/octet-stream';
}



//---------------------------------------

const cron = require('node-cron');

const UPLOADS_DIR = path.join(__dirname, 'uploads');

function clearUploads() {
  fs.readdir(UPLOADS_DIR, (err, files) => {
    if (err) {
      console.error("Error reading uploads directory:", err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(UPLOADS_DIR, file);
      fs.unlink(filePath, err => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log(`Deleted file: ${filePath}`);
        }
      });
    });
  });
}

// Schedule the task to run every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log("Running scheduled task to clear uploads directory...");
  clearUploads();
});

// Optionally, you can also manually call the function during development or testing
// clearUploads();




app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));