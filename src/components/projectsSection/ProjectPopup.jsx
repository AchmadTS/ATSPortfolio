import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  BsX,
  BsChevronLeft,
  BsChevronRight,
  BsInfoCircleFill,
  BsGithub,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const ProjectPopup = ({
  isOpen,
  onClose,
  name,
  year,
  image,
  link,
  techStack,
  description,
}) => {
  const [showAllTech, setShowAllTech] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const MAX_DESC_LENGTH = 150;
  const isDescLong = description.length > MAX_DESC_LENGTH;
  const displayTech = showAllTech ? techStack : techStack.slice(0, 5);
  const displayDesc =
    showFullDesc || !isDescLong
      ? description
      : `${description.slice(0, MAX_DESC_LENGTH).trim()}...`;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      setShowAllTech(false);
      setShowFullDesc(false);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl bg-surface-2/80 backdrop-blur-xl border border-border-soft rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-4 right-4 z-20 p-2 rounded-full text-text-muted hover:text-white hover:bg-card-soft transition-all duration-300"
            >
              <BsX size={24} />
            </button>

            <div className="w-full md:w-[55%] p-6 md:p-10 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-border-soft bg-card-soft/30 overscroll-contain">
              <button className="cursor-pointer absolute left-2 md:left-4 p-2 md:p-3 rounded-full bg-card/50 border border-border-soft text-text-muted hover:text-orange hover:border-orange transition-all z-10 backdrop-blur-md">
                <BsChevronLeft size={18} />
              </button>

              <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden border border-border-soft shadow-lg relative group">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <button className="cursor-pointer absolute right-2 md:right-4 p-2 md:p-3 rounded-full bg-card/50 border border-border-soft text-text-muted hover:text-orange hover:border-orange transition-all z-10 backdrop-blur-md">
                <BsChevronRight size={18} />
              </button>

              <div className="flex gap-2 mt-6">
                <span className="w-2 h-2 rounded-full bg-orange"></span>
                <span className="w-2 h-2 rounded-full bg-text-muted/50"></span>
                <span className="w-2 h-2 rounded-full bg-text-muted/50"></span>
              </div>
            </div>

            <div className="w-full md:w-[45%] p-6 md:p-10 flex flex-col custom-scroll overflow-y-auto overscroll-contain">
              <h2 className="text-3xl md:text-4xl font-bold text-orange font-body mb-1 mt-4 md:mt-0">
                {name}
              </h2>
              <p className="text-cyan font-special text-sm tracking-wider mb-4">
                {year}
              </p>

              <div className="flex flex-wrap gap-2 mb-6 items-center">
                {displayTech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-card border border-border-soft rounded-full text-xs text-text-muted hover:text-cyan hover:border-cyan/50 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}

                {techStack.length > 5 && (
                  <button
                    onClick={() => setShowAllTech(!showAllTech)}
                    className="p-1.5 bg-card-soft border border-border-soft rounded-full text-text-muted hover:text-cyan hover:border-cyan/50 transition-colors cursor-pointer flex items-center justify-center"
                    title={
                      showAllTech ? "Lebih sedikit" : "Lihat semua teknologi"
                    }
                  >
                    {showAllTech ? (
                      <BsChevronUp size={14} />
                    ) : (
                      <BsChevronDown size={14} />
                    )}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <BsInfoCircleFill className="text-text-muted" size={14} />
                <span className="text-xs font-bold tracking-widest text-text-muted uppercase">
                  Project Details
                </span>
              </div>

              <div className="mb-8">
                <p className="text-white/80 leading-relaxed font-special text-sm md:text-base">
                  {displayDesc}
                </p>

                {isDescLong && (
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="mt-2 text-cyan hover:text-orange font-bold text-sm transition-colors cursor-pointer block"
                  >
                    {showFullDesc ? "Sembunyikan" : "Lihat selengkapnya"}
                  </button>
                )}
              </div>

              <div className="mt-auto pt-6">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-card/50 hover:bg-card border border-border-soft hover:border-orange text-white py-3 md:py-4 rounded-xl transition-all duration-300 font-bold font-body group backdrop-blur-sm cursor-pointer"
                >
                  <BsGithub
                    className="text-text-muted group-hover:text-orange transition-colors"
                    size={20}
                  />
                  View Repository
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

ProjectPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
};

export default ProjectPopup;
