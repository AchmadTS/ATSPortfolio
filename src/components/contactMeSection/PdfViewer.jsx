/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { FiDownload, FiX } from "react-icons/fi";
import PropTypes from "prop-types";

const PdfViewer = ({ show, currentPdf, onClose }) => {
  const [isPdfClosing, setIsPdfClosing] = useState(false);
  const [isPdfOpening, setIsPdfOpening] = useState(false);

  useEffect(() => {
    if (show) {
      setIsPdfClosing(false);
      setTimeout(() => setIsPdfOpening(true), 10);
    }
  }, [show]);

  const handleClose = useCallback(() => {
    setIsPdfClosing(true);
    setIsPdfOpening(false);
    setTimeout(() => {
      onClose();
      setIsPdfClosing(false);
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && show) {
        handleClose();
      }
    };

    if (show) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [show, handleClose]);

  const handleDownload = () => {
    if (!currentPdf) return;
    const link = document.createElement("a");
    link.href = currentPdf.path;
    link.download = currentPdf.name;
    link.click();
  };

  if (!show || !currentPdf) return null;
  const pdfSrc = `${currentPdf.path}#toolbar=0&navpanes=0&scrollbar=0`;

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-2 sm:p-4 transition-opacity duration-300 ${
        isPdfOpening ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-gray-900 rounded-xl w-full max-w-5xl h-[95vh] sm:h-[90vh] border border-white/20 relative transition-all duration-300 ${
          isPdfOpening && !isPdfClosing
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/20 gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white truncate">
              {currentPdf.type === "creative" ? "Creative CV" : "ATS CV"}
            </h3>
            <p className="hidden lg:block text-sm text-gray-400 truncate">
              {currentPdf.name}
            </p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 md:px-4 py-2 bg-white/10 border border-white/20 text-white hover:bg-darkCyan rounded-lg transition-all duration-300 text-xs sm:text-sm md:text-base"
            >
              <FiDownload className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={handleClose}
              className="text-white/60 hover:text-white transition-colors p-1 sm:p-1.5 md:p-2"
            >
              <FiX className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe src={pdfSrc} className="w-full h-full" title="PDF Viewer" />
        </div>
      </div>
    </div>
  );
};

PdfViewer.propTypes = {
  show: PropTypes.bool.isRequired,
  currentPdf: PropTypes.shape({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default PdfViewer;
