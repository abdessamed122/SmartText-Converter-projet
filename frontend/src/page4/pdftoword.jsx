// import { useState } from 'react';
// import "./css2.css"; // Ensure you have this stylesheet

// const Main = () => {
//   const [fileUploaded, setFileUploaded] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [uploadResponse, setUploadResponse] = useState("");

//   const handleFileUpload = (e) => {
//     const files = e.target.files;
//     if (files.length > 0) {
//       setSelectedFiles(Array.from(files));
//       setFileUploaded(true);
//     } else {
//       setSelectedFiles([]);
//       setFileUploaded(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     if (selectedFiles.length === 0) {
//       alert("يرجى تحميل ملف قبل الإرسال");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("file", selectedFiles[0]);

//     try {
//       const response = await fetch("http://localhost:5000/convert-pdf-to-word", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }
  
//       const result = await response.json();
//       setUploadResponse(result.text);
//     } catch (error) {
//       console.error("خطأ أثناء رفع الملف:", error);
//       setUploadResponse("حدث خطأ أثناء رفع الملف.");
//     }
//   };

//   const handleCopy = () => {
//     if (uploadResponse) {
//       navigator.clipboard.writeText(uploadResponse);
//     }
//   };

//   const handleDownload = () => {
//     if (uploadResponse) {
//       const blob = new Blob([uploadResponse], { type: 'text/plain' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'extracted-text.txt';
//       link.click();
//       URL.revokeObjectURL(url);
//     }
//   };

//   return (
//     <div>
//       <section className="section home tool-section">
//         <div className="container">
//           <h1 className="h1 text-center text-black">Image Translator</h1>
//           <p className="text text-center text-black slogan">An Online tool to translate texts and documents.</p>
//           <div className="tool home tool-grid">
//             <div>
//               <div className="tool-span">
//                 <div className="tool-area">
//                   <div className="upload-section">
//                     <div className="before-upload upload-area">
//                       <label htmlFor="file">
//                         <img src="https://www.imagetotext.info/web_assets/frontend/img/icons/tool-box-image.svg" alt="image-logo" className="upload-section-img" />
//                       </label>
//                       <span className="drag-n-drop-text" id="js-drag-n-drop">
//                         Drop, Upload or Paste image
//                         <br /> <small> Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC, PDF</small>
//                       </span>
//                       <div className="selection-div"> 
//                         <div className="dropdown browse-btn">
//                           <label htmlFor="file" className="browse-dropbtn">Browse</label>
//                           <input
//                             id="file"
//                             type="file"
//                             style={{ display: 'none' }}
//                             onChange={handleFileUpload} 
//                           />
//                         </div>
//                       </div>

//                       <input
//                         hidden
//                         type="file"
//                         name="file"
//                         id="file"
//                         accept=".heic,.jpg,.jpeg,.gif,.png,.bmp,.jpe,.jif,.jfif,.jfi,.webp,.tiff,.tif,.pdf"
//                         multiple
//                         onChange={handleFileUpload}
//                         style={{ display: 'none', marginTop: '1rem' }}
//                       />
//                     </div>
//                   </div>

//                   {fileUploaded && (
//                     <div className="after-img-upload">
//                       <div className="selected-img-preview">
//                         <h4>الملفات المحملة:</h4>
//                         <ul>
//                           {selectedFiles.map((file, index) => (
//                             <li key={index}>{file.name}</li>
//                           ))}
//                         </ul>
//                       </div>
//                       {uploadResponse && (
//                         <div className="upload-response">
//                           <h3>النتيجة:</h3>
//                           <textarea className='img-text' readOnly value={uploadResponse} />
//                           <img
//                             className="single_text_copy_btn"
//                             id={0}
//                             src="https://www.imagetotext.info/web_assets/frontend/img/copy.svg"
//                             alt="copy image icon"
//                             onClick={handleCopy}
//                             style={{ cursor: 'pointer', marginLeft: '10px' }}
//                           />
//                         </div>
//                       )}
//                       <div className="images-clear">
//                         <button className="start-over-btn" onClick={() => { setFileUploaded(false); setSelectedFiles([]); setUploadResponse(""); }}>
//                           مسح الكل
//                         </button>        
//                         <button className="start-over-btn" onClick={handleSubmit}>إرسال</button>
//                         <button className="start-over-btn" onClick={handleDownload}>
//                           تحميل نص
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <p className="privacy-disclaimer">*خصوصيتك محمية! لا يتم إرسال أو تخزين أي بيانات.</p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Main;
// :::::::::::::::::::::::::::::
// import { useState } from 'react';
// import "./css2.css"; // Ensure you have this stylesheet

// const Main = () => {
//   const [fileUploaded, setFileUploaded] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [uploadResponse, setUploadResponse] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(""); // Error state

//   const handleFileUpload = (e) => {
//     const files = e.target.files;
//     if (files.length > 0) {
//       setSelectedFiles(Array.from(files));
//       setFileUploaded(true);
//     } else {
//       setSelectedFiles([]);
//       setFileUploaded(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     if (selectedFiles.length === 0) {
//       alert("يرجى تحميل ملف قبل الإرسال");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("file", selectedFiles[0]); // Use only the first file for submission

//     setLoading(true); // Start loading
//     setError(""); // Clear previous errors

//     try {
//       const response = await fetch("http://localhost:5000/convert-pdf-to-word", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }
  
//       const result = await response.json();
//       setUploadResponse(result.text);
//     } catch (error) {
//       console.error("خطأ أثناء رفع الملف:", error);
//       setError("حدث خطأ أثناء رفع الملف. " + error.message); // Set error message
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   const handleCopy = () => {
//     if (uploadResponse) {
//       navigator.clipboard.writeText(uploadResponse);
//     }
//   };

// //   const handleDownload = () => {
// //     if (uploadResponse) {
// //       const blob = new Blob([uploadResponse], { type: 'text/plain' });
// //       const url = URL.createObjectURL(blob);
// //       const link = document.createElement('a');
// //       link.href = url;
// //       link.download = 'extracted-text.txt';
// //       link.click();
// //       URL.revokeObjectURL(url);
// //     }
// //   };
// const handleDownload = async () => {
//     if (uploadResponse) {
//       try {
//         const response = await fetch(uploadResponse, {
//           method: 'GET',
//         });
  
//         if (!response.ok) {
//           throw new Error(`Error fetching the file: ${response.statusText}`);
//         }
  
//         const blob = await response.blob(); // الحصول على الاستجابة كـ Blob
//         const url = URL.createObjectURL(blob); // إنشاء URL لـ Blob
//         const link = document.createElement('a'); // إنشاء عنصر رابط
  
//         link.href = url; // تعيين href إلى URL Blob
//         link.download = 'downloaded-file.pdf'; // تعيين اسم الملف الافتراضي
//         document.body.appendChild(link); // إضافة الرابط إلى الجسم
//         link.click(); // بدء التحميل
//         document.body.removeChild(link); // إزالة الرابط من DOM
//         URL.revokeObjectURL(url); // تنظيف URL.createObjectURL
//       } catch (error) {
//         console.error("خطأ أثناء تحميل الملف:", error);
//         alert("حدث خطأ أثناء تحميل الملف.");
//       }
//     } else {
//       alert("يرجى التأكد من تحميل ملف والاستجابة صحيحة.");
//     }
//   };
  
  
//   return (
//     <div>
//       <section className="section home tool-section">
//         <div className="container">
//           <h1 className="h1 text-center text-black">Image Translator</h1>
//           <p className="text text-center text-black slogan">An Online tool to translate texts and documents.</p>
//           <div className="tool home tool-grid">
//             <div>
//               <div className="tool-span">
//                 <div className="tool-area">
//                   <div className="upload-section">
//                     <div className="before-upload upload-area">
//                       <label htmlFor="file">
//                         <img src="https://www.imagetotext.info/web_assets/frontend/img/icons/tool-box-image.svg" alt="image-logo" className="upload-section-img" />
//                       </label>
//                       <span className="drag-n-drop-text" id="js-drag-n-drop">
//                         Drop, Upload or Paste image
//                         <br /> <small> Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC, PDF</small>
//                       </span>
//                       <div className="selection-div"> 
//                         <div className="dropdown browse-btn">
//                           <label htmlFor="file" className="browse-dropbtn">Browse</label>
//                           <input
//                             id="file"
//                             type="file"
//                             style={{ display: 'none' }}
//                             onChange={handleFileUpload} 
//                           />
//                         </div>
//                       </div>

//                       <input
//                         hidden
//                         type="file"
//                         name="file"
//                         id="file"
//                         accept=".heic,.jpg,.jpeg,.gif,.png,.bmp,.jpe,.jif,.jfif,.jfi,.webp,.tiff,.tif,.pdf"
//                         multiple
//                         onChange={handleFileUpload}
//                         style={{ display: 'none', marginTop: '1rem' }}
//                       />
//                     </div>
//                   </div>

//                   {fileUploaded && (
//                     <div className="after-img-upload">
//                       <div className="selected-img-preview">
//                         <h4>الملفات المحملة:</h4>
//                         <ul>
//                           {selectedFiles.map((file, index) => (
//                             <li key={index}>{file.name}</li>
//                           ))}
//                         </ul>
//                       </div>
//                       {uploadResponse && (
//                         <div className="upload-response">
//                           <h3>النتيجة:</h3>
//                           <textarea className='img-text' readOnly value={uploadResponse} />
//                           <img
//                             className="single_text_copy_btn"
//                             id={0}
//                             src="https://www.imagetotext.info/web_assets/frontend/img/copy.svg"
//                             alt="copy image icon"
//                             onClick={handleCopy}
//                             style={{ cursor: 'pointer', marginLeft: '10px' }}
//                           />
//                         </div>
//                       )}
//                       {error && <div className="error-message">{error}</div>} {/* Display error message */}
//                       <div className="images-clear">
//                         <button className="start-over-btn" onClick={() => { setFileUploaded(false); setSelectedFiles([]); setUploadResponse(""); setError(""); }}>
//                           مسح الكل
//                         </button>        
//                         <button className="start-over-btn" onClick={handleSubmit} disabled={loading}>
//                           {loading ? "جاري التحميل..." : "إرسال"} {/* Loading button */}
//                         </button>
//                         <button className="start-over-btn" onClick={handleDownload}>
//                           تحميل نص
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <p className="privacy-disclaimer">*خصوصيتك محمية! لا يتم إرسال أو تخزين أي بيانات.</p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Main;
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
import { useState } from 'react';
import "./css2.css"; // تأكد من وجود هذا النمط

const Main = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadResponse, setUploadResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setSelectedFiles(Array.from(files));
      setFileUploaded(true);
    } else {
      setSelectedFiles([]);
      setFileUploaded(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("يرجى تحميل ملف قبل الإرسال");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFiles[0]);
  
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("http://localhost:5000/convert-pdf-to-word", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const result = await response.json();
      setUploadResponse(result.outputUrl); // تأكد من أن الاستجابة تحتوي على URL الصحيح

      console.log("URL للتحميل:", result.outputUrl); // تحقق من URL
    } catch (error) {
      console.error("خطأ أثناء رفع الملف:", error);
      setError("حدث خطأ أثناء رفع الملف. " + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  // const handleCopy = () => {
  //   if (uploadResponse) {
  //     navigator.clipboard.writeText(uploadResponse);
  //   }
  // };

 // في دالة handleDownload، يمكنك إضافة إشعار تأكيد بعد التحميل الناجح
 const handleDownload = async () => {
  console.log("تحميل الملف تم استدعاؤه",); // سجل للمساعدة في تتبع
  if (uploadResponse) {
    try {
      const response = await fetch(uploadResponse);
      
      if (!response.ok) {
        console.error("خطأ في استجابة الخادم:", response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob(); // تحويل الاستجابة إلى Blob
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'extracted-file.docx'; // يمكنك تعديل الاسم حسب الحاجة
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert("تم تحميل الملف بنجاح!"); // إشعار بنجاح التحميل
    } catch (error) {
      console.error("خطأ أثناء تحميل الملف:", error);
      alert("حدث خطأ أثناء تحميل الملف.");
    }
  } else {
    alert("لا يوجد URL لتحميل الملف."); // إعلام المستخدم بعدم وجود URL
  }
};


  
  
  return (
    <div>
      <section className="section home tool-section">
        <div className="container">
          <h1 className="h1 text-center text-black">Image Translator</h1>
          <p className="text text-center text-black slogan">Easily convert files from one format to another, online.</p>


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
                        <br /> <small> Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC, PDF</small>
                      </span>
                      <div className="selection-div"> 
                        <div className="dropdown browse-btn">
                          <label htmlFor="file" className="browse-dropbtn">Browse</label>
                          <input
                            id="file"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload} 
                          />
                        </div>
                      </div>

                      <input
                        hidden
                        type="file"
                        name="file"
                        id="file"
                        accept=".heic,.jpg,.jpeg,.gif,.png,.bmp,.jpe,.jif,.jfif,.jfi,.webp,.tiff,.tif,.pdf"
                        multiple
                        onChange={handleFileUpload}
                        style={{ display: 'none', marginTop: '1rem' }}
                      />
                    </div>
                  </div>

                  {fileUploaded && (
                    <div className="after-img-upload">
                      <div className="selected-img-preview">
                        <h4>الملفات المحملة:</h4>
                        <ul>
                          {selectedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                      {/* {uploadResponse && (
                        <div className="upload-response">
                          <h3>النتيجة:</h3>
                          <textarea className='img-text' readOnly value={uploadResponse} />
                          <img
                            className="single_text_copy_btn"
                            id={0}
                            src="https://www.imagetotext.info/web_assets/frontend/img/copy.svg"
                            alt="copy image icon"
                            onClick={handleCopy}
                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                          />
                        </div>
                      )} */}
                      {error && <div className="error-message">{error}</div>}
                      <div className="images-clear">
                        <button className="start-over-btn" onClick={() => { setFileUploaded(false); setSelectedFiles([]); setUploadResponse(""); setError(""); }}>
                          مسح الكل
                        </button>        
                        <button className="start-over-btn" onClick={handleSubmit} disabled={loading}>
                          {loading ? "جاري التحميل..." : "إرسال"}
                        </button>
                        <button className="start-over-btn" onClick={handleDownload}>
                          تحميل نص
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
