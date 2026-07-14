/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { FiDownload, FiX } from "react-icons/fi";
import PropTypes from "prop-types";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const PdfViewer = ({ show, currentPdf, onClose }) => {
  const [isPdfClosing, setIsPdfClosing] = useState(false);
  const [isPdfOpening, setIsPdfOpening] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pdfWidth, setPdfWidth] = useState(300);
  const [isDesktop, setIsDesktop] = useState(true);

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
      setNumPages(null);
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && show) {
        handleClose();
      }
    };
    if (show) document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [show, handleClose]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 768);
      if (width < 768) {
        setPdfWidth(width - 48);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownload = () => {
    if (!currentPdf) return;
    const link = document.createElement("a");
    link.href = currentPdf.path;
    link.download = currentPdf.name;
    link.click();
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!show || !currentPdf) return null;

  return (
    <div
      className={`backdrop-blur-md fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-2 sm:p-4 transition-opacity duration-300 ${
        isPdfOpening ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-surface rounded-xl w-full max-w-5xl h-[95vh] sm:h-[90vh] border border-border-soft relative transition-all duration-300 ${
          isPdfOpening && !isPdfClosing
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border-soft gap-2 shrink-0">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white truncate">
              {currentPdf.type === "certificate"
                ? "Certificate"
                : currentPdf.type === "creative"
                  ? "Creative CV"
                  : "ATS CV"}
            </h3>
            <p className="hidden lg:block text-sm text-text-muted truncate">
              {currentPdf.name}
            </p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleDownload}
              className="cursor-pointer flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 md:px-4 py-2 bg-card border border-border-soft text-white hover:bg-darkCyan rounded-lg transition-all duration-300 text-xs sm:text-sm md:text-base"
            >
              <FiDownload className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={handleClose}
              className="cursor-pointer text-white/60 hover:text-white transition-colors p-1 sm:p-1.5 md:p-2"
            >
              <FiX className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-black/50 rounded-b-xl relative">
          {isDesktop ? (
            <iframe
              src={currentPdf.path}
              className="w-full h-full bg-white border-none"
              title="PDF Viewer"
            />
          ) : (
            <div className="w-full h-full overflow-y-auto overscroll-contain transform-gpu [-webkit-overflow-scrolling:touch]">
              <div className="flex flex-col items-center w-full min-h-full py-4">
                <Document
                  file={currentPdf.path}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <span className="text-cyan text-sm flex h-full items-center justify-center mt-10">
                      Memuat PDF...
                    </span>
                  }
                  error={
                    <div className="flex flex-col items-center mt-10">
                      <span className="text-red-500 text-sm">
                        Gagal memuat PDF.
                      </span>
                      <button
                        onClick={handleDownload}
                        className="text-cyan mt-2 underline cursor-pointer"
                      >
                        Download File
                      </button>
                    </div>
                  }
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} className="mb-4 shadow-md">
                      <Page
                        pageNumber={index + 1}
                        width={pdfWidth}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        devicePixelRatio={window.devicePixelRatio || 2}
                        className="flex items-center justify-center bg-white rounded-md overflow-hidden"
                      />
                    </div>
                  ))}
                </Document>
              </div>
            </div>
          )}
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
