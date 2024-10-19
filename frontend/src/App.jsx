// import { BrowserRouter as Router,Switch,Route } from "react-router-dom"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page1 from "./page1/page1";
import Page2 from "./page2/Page2"
import Page3 from "./page3/page3";
import Page4 from "./page4/Page4";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/extract-text-summarize-ai" element={<Page2 />} />
      <Route path="/extract-text-translate-ai" element={<Page3 />} />
      <Route path="/pdf-to-word" element={<Page4 />} />


    </Routes>
  </Router>
 
  );
}

export default App;

