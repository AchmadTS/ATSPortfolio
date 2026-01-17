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
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
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
        }
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

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && showPopup) {
        closePopup();
      }
    };

    if (showPopup) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [showPopup]);

  const handleDownload = (cvType) => {
    const cvPaths = {
      creative: "/pdf/Professional Modern CV-Achmad_Tirto_Sudiro.pdf",
      ats: "/pdf/CV-ATS-Achmad_Tirto_Sudiro.pdf"
    };
    
    const link = document.createElement("a");
    link.href = cvPaths[cvType];
    link.download = cvType === "creative" 
      ? "Professional Modern CV-Achmad_Tirto_Sudiro.pdf"
      : "ATS CV-Achmad_Tirto_Sudiro.pdf";
    link.click();
    setShowPopup(false);
  };

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
          className={`fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 transition-opacity duration-300 ${isOpening ? 'opacity-100' : 'opacity-0'}`}
          onClick={closePopup}
        >
          <div 
            className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 max-w-md w-full border border-white/20 relative transition-all duration-300 ${isOpening && !isClosing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <FiX size={24} />
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-2">Choose CV Type</h3>
            <p className="text-gray-400 mb-6">Select which CV format you&apos;d like to download</p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleDownload("creative")}
                className="w-full rounded-lg bg-white/10 border border-white/20 text-white py-4 px-6 text-left hover:bg-darkCyan transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">Creative CV</p>
                    <p className="text-sm text-white/80">Modern & visually appealing design</p>
                  </div>
                  <FiDownload size={24} className="group-hover:translate-y-1 transition-transform" />
                </div>
              </button>
              
              <button
                onClick={() => handleDownload("ats")}
                className="w-full rounded-lg bg-white/10 border border-white/20 text-white py-4 px-6 text-left hover:bg-darkCyan transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">ATS CV</p>
                    <p className="text-sm text-white/80">Optimized for applicant tracking systems</p>
                  </div>
                  <FiDownload size={24} className="group-hover:translate-y-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;