
import { useState } from 'react';

const Main = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadResponse, setUploadResponse] = useState(""); 
  const [loading, setLoading] = useState(false); // حالة الانتظار

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setSelectedFiles(Array.from(files)); // تحويل الملفات إلى مصفوفة
      setFileUploaded(true);
      setUploadResponse(""); // إعادة تعيين الرد عند تحميل ملفات جديدة
    } else {
      setSelectedFiles([]);
      setFileUploaded(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      alert("Please upload a file before submitting");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFiles[0]);
    formData.append("format", selectedFiles[0].name.split('.').pop());

    setLoading(true); // تفعيل حالة الانتظار

    try {
      const response = await fetch("http://localhost:5000/extract-text-ai", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      setUploadResponse(result.text);
    } catch (error) {
      console.error("Error uploading the file:", error);
      setUploadResponse("An error occurred while uploading the file.");
    } finally {
      setLoading(false); // إيقاف حالة الانتظار
    }
  };

  const handleCopy = () => {
    if (uploadResponse) {
      navigator.clipboard.writeText(uploadResponse);
    }
  };

  const handleDownload = () => {
    if (uploadResponse) {
      const blob = new Blob([uploadResponse], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'extracted-text.txt'; 
      link.click();
      URL.revokeObjectURL(url); 
    }
  };

  return (
    <div>
      <section className="section home tool-section">
        <div className="container">
          <h1 className="h1 text-center text-black">Image to Text Converter</h1>
          <p className="text text-center text-black slogan">
            An online image to text converter to extract text from images.
          </p>
          <div className="tool home tool-grid">
            <div>
              <div className="tool-span">
                <div className="tool-area">
                  <div className="upload-section">
                    <div className="before-upload upload-area">
                      <label htmlFor="file">
                        <img src="https://www.imagetotext.info/web_assets/frontend/img/icons/tool-box-image.svg" alt="image-logo" className="upload-section-img" />
                      </label>
                      <span className="drag-n-drop-text" id="js-drag-n-drop">
                        Drop, Upload or Paste image
                        <br /> 
                        <small>Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC, PDF</small>
                      </span>
                      <div className="selection-div"> 
                        <div className="dropdown browse-btn">
                          <label htmlFor="file" className="browse-dropbtn">Browse</label>
                          <input
                            id="file"
                            type="file"
                            accept=".heic,.jpg,.jpeg,.gif,.png,.bmp,.jpe,.jif,.jfif,.jfi,.webp,.tiff,.tif,.pdf"
                            multiple
                            onChange={handleFileUpload} 
                            style={{ display: 'none' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {fileUploaded && (
                    <div className="after-img-upload">
                      <div className="selected-img-preview">
                        <h4>Uploaded Files:</h4>
                        <ul>
                          {selectedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                      {uploadResponse && (
                        <div className="upload-response">
                          <h3>Result:</h3>
                          <textarea className='img-text' readOnly>{uploadResponse}</textarea>
                          <img
                            className="single_text_copy_btn"
                            id={0}
                            src="https://www.imagetotext.info/web_assets/frontend/img/copy.svg"
                            alt="copy image icon"
                            onClick={handleCopy}
                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                          />
                        </div>
                      )}
                      <div className="images-clear">
                        <button className="start-over-btn" onClick={() => { setFileUploaded(false); setSelectedFiles([]); setUploadResponse(""); }}>
                          Clear All
                        </button>        
                        <button className="start-over-btn" onClick={handleSubmit} disabled={loading}>
                          {loading ? 'waiting...' : 'Submit'}
                        </button>
                        <button className="start-over-btn" onClick={handleDownload}>
                          Download Text
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="privacy-disclaimer">*Your privacy is protected! No data is sent or stored.</p>
        </div>
      </section>
    </div>
  );
};

export default Main;
