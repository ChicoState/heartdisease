import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FraminghamPage from "./pages/FraminghamPage";
import ASCVDPage from "./pages/ASCVDPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/framingham" element={<FraminghamPage />} />
        <Route path="/ascvd" element={<ASCVDPage />} />
      </Routes>
    </Router>
  );
};

export default App;