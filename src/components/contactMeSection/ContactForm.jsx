// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiDownload } from "react-icons/fi";
import DownloadPopup from "./DownloadPopup";
import PdfViewer from "./PdfViewer";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_k16fbth", "template_2etb25a", form.current, {
        publicKey: "_l1lSbUFXovxjJal0",
      })
      .then(
        () => {
          setEmail("");
          setName("");
          setMessage("");
          setSuccess(`Message Sent Successfully to "${email}"`);
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
  };

  const handleDownloadClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openPdfViewer = (cvType) => {
    const cvPaths = {
      creative: "/pdf/Professional Modern CV-Achmad_Tirto_Sudiro.pdf",
      ats: "/pdf/CV-ATS-Achmad_Tirto_Sudiro.pdf",
    };

    setCurrentPdf({
      path: cvPaths[cvType],
      name:
        cvType === "creative"
          ? "Professional Modern CV-Achmad_Tirto_Sudiro.pdf"
          : "ATS CV-Achmad_Tirto_Sudiro.pdf",
      type: cvType,
    });

    setShowPopup(false);
    setTimeout(() => {
      setShowPdfViewer(true);
    }, 350);
  };

  const closePdfViewer = () => {
    setShowPdfViewer(false);
    setCurrentPdf(null);
    setTimeout(() => {
      setShowPopup(true);
    }, 100);
  };

  const handleDirectDownload = (cvType) => {
    const cvPaths = {
      creative: "/pdf/Professional Modern CV-Achmad_Tirto_Sudiro.pdf",
      ats: "/pdf/CV-ATS-Achmad_Tirto_Sudiro.pdf",
    };

    const link = document.createElement("a");
    link.href = cvPaths[cvType];
    link.download =
      cvType === "creative"
        ? "Professional Modern CV-Achmad_Tirto_Sudiro.pdf"
        : "ATS CV-Achmad_Tirto_Sudiro.pdf";
    link.click();
    closePopup();
  };

  return (
    <div>
      <p className="text-cyan mb-2">{success}</p>
      <form ref={form} className="flex flex-col gap-4">
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          autoComplete="off"
          required
          className="h-12 rounded-lg bg-transparent px-3 text-white placeholder-gray-400 border border-white/20 outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all duration-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="from_email"
          placeholder="Your Email"
          autoComplete="off"
          required
          className="h-12 rounded-lg bg-transparent px-3 text-white placeholder-gray-400 border border-white/20 outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          name="message"
          rows="6"
          autoComplete="off"
          placeholder="Message"
          required
          className="rounded-lg bg-transparent p-3 text-white placeholder-gray-400 border border-white/20 outline-none resize-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all duration-300"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendEmail}
          className="w-full rounded-lg border border-cyan text-white h-12 font-bold text-xl hover:bg-darkCyan bg-cyan transition-all duration-500"
        >
          Send
        </button>

        <button
          onClick={handleDownloadClick}
          className="w-full rounded-lg border border-white/20 text-white h-12 flex items-center justify-center gap-2 font-semibold text-lg hover:bg-white/10 transition-all duration-300"
        >
          <FiDownload size={22} />
          Download CV
        </button>
      </form>

      <DownloadPopup
        show={showPopup}
        onClose={closePopup}
        onPreview={openPdfViewer}
        onDirectDownload={handleDirectDownload}
      />

      <PdfViewer
        show={showPdfViewer}
        currentPdf={currentPdf}
        onClose={closePdfViewer}
      />
    </div>
  );
};

export default ContactForm;
