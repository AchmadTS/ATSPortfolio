/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { FiDownload, FiX } from "react-icons/fi";
import PropTypes from "prop-types";

const DownloadPopup = ({ show, onClose, onPreview, onDirectDownload }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (show) {
      setIsClosing(false);
      setTimeout(() => setIsOpening(true), 10);
    }
  }, [show]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setIsOpening(false);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
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

  if (!show) return null;

  return (
    <div
      className={`backdrop-blur-md fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 transition-opacity duration-300 ${isOpening ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 max-w-md w-full border border-white/20 relative transition-all duration-300 ${isOpening && !isClosing ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <FiX size={24} />
        </button>

        <h3 className="text-2xl font-bold text-white mb-2">Choose CV Type</h3>
        <p className="text-gray-400 mb-6">
          Select which CV format you&apos;d like to view or download
        </p>

        <div className="flex flex-col gap-3">
          <div
            onClick={() => onPreview("creative")}
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
                  onDirectDownload("creative");
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
            onClick={() => onPreview("ats")}
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
                  onDirectDownload("ats");
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
  );
};

DownloadPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  onDirectDownload: PropTypes.func.isRequired,
};

export default DownloadPopup;
