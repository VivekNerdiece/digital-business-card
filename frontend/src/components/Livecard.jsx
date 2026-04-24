import React from "react";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

import {
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaQrcode
} from "react-icons/fa";

function Livecard({ formData, cardLink }) {

  // const [showQR, setShowQR] = useState(false);

  const getImageSrc = (image) => {
    if (!image) return null;

    // File object (preview)
    if (typeof image === "object") {
      return URL.createObjectURL(image);
    }

    // String from DB
    return `http://localhost:5000/uploads/${image}`;
  };

  const actions = (formData.actions || []).filter(a => a.value);

  const getLink = (action) => {
    switch (action.type) {
      case "call":
        return `tel:${action.value}`;

      case "whatsapp":
        return `https://wa.me/${action.value.replace(/\D/g, "")}`;

      case "email":
        return `mailto:${action.value}`;

      case "website":
        return action.value.startsWith("http")
          ? action.value
          : `https://${action.value}`;

      case "location":
        if (action.value.startsWith("http")) {
          return action.value;
        }
      default:
        return "#";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "call": return <FaPhone />;
      case "whatsapp": return <FaWhatsapp />;
      case "email": return <FaEnvelope />;
      case "website": return <FaGlobe />;
      case "location": return <FaMapMarkerAlt />;
      default: return null;
    }
  };

  const getLabel = (type) => {
    switch (type) {
      case "call": return "Phone";
      case "whatsapp": return "WhatsApp";
      case "email": return "Email";
      case "website": return "Website";
      case "location": return "Location";
      default: return "";
    }
  };

  return (
    <div className="phone-card">


      {/* <div className="qr-icon" onClick={() => setShowQR(true)}>
        <FaQrcode />
      </div> */}

      {/* TOP BANNER */}
      <div className="card-banner">
        {formData.brandImage ? (
          <img src={getImageSrc(formData.brandImage)} alt="brand" />
        ) : (
          <h2 className="logo-text">Your Brand</h2>
        )}
      </div>

      {/* PROFILE IMAGE */}
      <div className="profile-wrapper">
        <img
          src={
            formData.profilePicture
              ? getImageSrc(formData.profilePicture)
              : "https://i.pravatar.cc/150?img=12"
          }
          alt="profile"
        />
      </div>

      {/* INFO CARD */}
      <div className="info-card">

        <h3>
          {formData.prefix || "Mr"}{" "}
          {formData.firstname || "John"}{" "}
          {formData.lastname || "Doe"}
        </h3>

        <p className="job">
          {formData.jobtitle || "Founder"}
        </p>

        <p className="company">
          {formData.company || "Company"}
        </p>

        <p className="desc">
          {formData.address || "Address"},{" "}
          {formData.state || "State"},{" "}
          {formData.country || "Country"}
        </p>

      </div>


      {/* ACTION BUTTONS */}
      <div className="action-list">

        {actions.map((action, index) => (
          <a
            key={index}
            href={getLink(action)}
            target="_blank"
            rel="noreferrer"
            className="action-pill"
          >
            {getIcon(action.type)}
            <span>{getLabel(action.type)}</span>
          </a>
        ))}

      </div>
      {/* {showQR && (
        <div className="qr-modal" onClick={() => setShowQR(false)}>
          <div className="qr-box" onClick={(e) => e.stopPropagation()}>
            <h3>Scan QR</h3>

            <QRCodeCanvas value={cardLink || "http://localhost:3000"} size={200} />

            <button onClick={() => setShowQR(false)}>Close</button>
          </div>
        </div>
      )} */}

    </div>
  );
}

export default Livecard;