import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

import Home from "./Home";
import CardPage from "./components/CardPage";

function App() {
  const [cardLink, setCardLink] = useState("");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home setCardLink={setCardLink} />}
        />
        <Route path="/card/:id" element={<CardPage />} />
      </Routes>

      {/* QR Code */}
      {cardLink && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h3>Scan to view card</h3>
          <QRCodeCanvas value={cardLink} size={200} />
        </div>
      )}
    </>
  );
}

export default App;