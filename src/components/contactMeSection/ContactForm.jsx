// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FiDownload, FiX } from "react-icons/fi";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isPdfClosing, setIsPdfClosing] = useState(false);
  const [isPdfOpening, setIsPdfOpening] = useState(false);
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
    setIsClosing(false);
    setTimeout(() => setIsOpening(true), 10);
  };

  const closePopup = () => {
    setIsClosing(true);
    setIsOpening(false);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300);
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
    closePopup();

    setTimeout(() => {
      setShowPdfViewer(true);
      setIsPdfClosing(false);
      setTimeout(() => setIsPdfOpening(true), 10);
    }, 350);
  };

  const closePdfViewer = () => {
    setIsPdfClosing(true);
    setIsPdfOpening(false);
    setTimeout(() => {
      setShowPdfViewer(false);
      setIsPdfClosing(false);
      setCurrentPdf(null);

      setTimeout(() => {
        setShowPopup(true);
        setIsClosing(false);
        setTimeout(() => setIsOpening(true), 10);
      }, 100);
    }, 300);
  };

  const handleDownload = () => {
    if (currentPdf) {
      const link = document.createElement("a");
      link.href = currentPdf.path;
      link.download = currentPdf.name;
      link.click();
    }
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

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        if (showPdfViewer) {
          closePdfViewer();
        } else if (showPopup) {
          closePopup();
        }
      }
    };

    if (showPopup || showPdfViewer) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [showPopup, showPdfViewer]);

  return (
    <div>
      <p className="text-cyan mb-2">{success}</p>
      <div ref={form} className="flex flex-col gap-4">
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
      </div>

      {showPopup && (
        <div
          className={`fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 transition-opacity duration-300 ${isOpening ? "opacity-100" : "opacity-0"}`}
          onClick={closePopup}
        >
          <div
            className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 max-w-md w-full border border-white/20 relative transition-all duration-300 ${isOpening && !isClosing ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <FiX size={24} />
            </button>

            <h3 className="text-2xl font-bold text-white mb-2">
              Choose CV Type
            </h3>
            <p className="text-gray-400 mb-6">
              Select which CV format you&apos;d like to view or download
            </p>

            <div className="flex flex-col gap-3">
              <div
                onClick={() => openPdfViewer("creative")}
                className="w-full rounded-lg bg-white/10 border border-white/20 text-white py-4 px-6 hover:bg-darkCyan transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">Creative CV</p>
                    <p className="text-sm text-white/80">
                      Modern & visually appealing design
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDirectDownload("creative");
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <FiDownload
                      size={24}
                      className="group-hover:translate-y-1 transition-transform"
                    />
                  </button>
                </div>
              </div>

              <div
                onClick={() => openPdfViewer("ats")}
                className="w-full rounded-lg bg-white/10 border border-white/20 text-white py-4 px-6 hover:bg-darkCyan transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">ATS CV</p>
                    <p className="text-sm text-white/80">
                      Optimized for applicant tracking systems
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDirectDownload("ats");
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <FiDownload
                      size={24}
                      className="group-hover:translate-y-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPdfViewer && currentPdf && (
        <div
          className={`fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4 transition-opacity duration-300 ${isPdfOpening ? "opacity-100" : "opacity-0"}`}
          onClick={closePdfViewer}
        >
          <div
            className={`bg-gray-900 rounded-xl w-full max-w-5xl h-[90vh] border border-white/20 relative transition-all duration-300 ${isPdfOpening && !isPdfClosing ? "scale-100 opacity-100" : "scale-95 opacity-0"} flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/20 gap-2">
              <div className="min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {currentPdf.type === "creative" ? "Creative CV" : "ATS CV"}
                </h3>
                <p className="text-sm text-gray-400 hidden md:block truncate max-w-[40ch]">
                  {currentPdf.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-white/10 border border-white/20 text-white hover:bg-darkCyan rounded-lg transition-all duration-300 text-sm md:text-base"
                >
                  <FiDownload size={18} className="md:w-5 md:h-5" />
                  <span className="inline">Download</span>
                </button>
                <button
                  onClick={closePdfViewer}
                  className="text-white/60 hover:text-white transition-colors p-1.5 md:p-2"
                >
                  <FiX size={24} className="md:w-7 md:h-7" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={currentPdf.path}
                className="w-full h-full"
                title="PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
