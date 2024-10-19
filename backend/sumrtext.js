// const dotenv =require("dotenv");
// dotenv.config();
// const ApiKey = process.env.GOOGLE_GEN_AI_API_KEY;

const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");




// Load API key from environment variables
const ApiKey = "AIzaSyCMoofI5sXPIrmxvNPSVl9VCsFkxFp7GkU";

// Initialize the GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(ApiKey);

async function extractTextFromImage() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const inputfile = 'imgarb.jpg'
    const imagePath = path.join(__dirname, inputfile);
    const imageData = fs.readFileSync(imagePath);
    const base64Image = Buffer.from(imageData).toString("base64");

    const result = await model.generateContent([
      "Extract the text in the photo",
      {
        inlineData: {
          data: base64Image,
          mimeType: 'image/jpg'
        }
      }
    ]);
    
    const extractedText = result.response.text();
    console.log("Extracted Text:", extractedText);

    return extractedText;
  } catch (error) {
    console.error("Error extracting text from image:", error);
  }
}

async function summarizeText(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = "Summarize this text with Same language as written:" + text;
    const result = await model.generateContent(prompt);
    
    const summary = result.response.text();
    console.log("Summary:", summary);

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
// ++++++++++++++++++++
