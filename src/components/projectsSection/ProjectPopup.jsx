import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  BsX,
  BsChevronLeft,
  BsChevronRight,
  BsInfoCircleFill,
  BsGithub,
  BsChevronDown,
  BsChevronUp,
  BsPerson,
  BsLink45Deg,
  BsChevronDoubleDown,
} from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const ProjectPopup = ({
  isOpen,
  onClose,
  name,
  year,
  images,
  link,
  role,
  techStack,
  description,
}) => {
  const [showAllTech, setShowAllTech] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const MAX_DESC_LENGTH = 150;
  const isDescLong = description.length > MAX_DESC_LENGTH;
  const displayTech = showAllTech ? techStack : techStack.slice(0, 5);
  const displayDesc =
    showFullDesc || !isDescLong
      ? description
      : `${description.slice(0, MAX_DESC_LENGTH).trim()}...`;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setShowScrollBtn(false);
    } else {
      setShowScrollBtn(true);
    }
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => handleScroll(), 100);
    }
  }, [isOpen, showAllTech, showFullDesc]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      setCurrentIndex(0);
    } else {
      setShowAllTech(false);
      setShowFullDesc(false);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    let slideInterval;
    if (isOpen && images.length > 1 && currentIndex < images.length - 1) {
      slideInterval = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 3000);
    }

    return () => {
      if (slideInterval) clearInterval(slideInterval);
    };
  }, [isOpen, currentIndex, images.length]);

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
            className="relative w-full max-w-5xl bg-surface-2/80 backdrop-blur-xl border border-border-soft rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:h-[80vh] overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full md:w-[55%] pt-16 pb-6 px-6 md:p-10 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-border-soft bg-card-soft/30 overscroll-contain">
              {images.length > 1 && currentIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="cursor-pointer absolute left-2 md:left-4 p-2 md:p-3 rounded-full bg-card/50 border border-border-soft text-text-muted hover:text-orange hover:border-orange transition-all z-20 backdrop-blur-md"
                >
                  <BsChevronLeft size={18} />
                </button>
              )}

              <div className="relative w-fit h-fit max-w-full rounded-xl overflow-hidden border border-border-soft shadow-lg group flex items-center justify-center">
                <div className="grid opacity-0 pointer-events-none select-none">
                  {images.map((img, index) => (
                    <img
                      key={`ghost-${index}`}
                      src={img}
                      alt=""
                      aria-hidden="true"
                      className="col-start-1 row-start-1 w-auto h-auto max-w-full max-h-64 sm:max-h-80 md:max-h-96 lg:max-h-100 object-contain object-center"
                    />
                  ))}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      src={images[currentIndex]}
                      alt={`${name} - ${currentIndex + 1}`}
                      className="w-auto h-auto max-w-full max-h-full object-contain object-center"
                    />
                  </AnimatePresence>
                </div>
              </div>

              {images.length > 1 && currentIndex < images.length - 1 && (
                <button
                  onClick={handleNext}
                  className="cursor-pointer absolute right-2 md:right-4 p-2 md:p-3 rounded-full bg-card/50 border border-border-soft text-text-muted hover:text-orange hover:border-orange transition-all z-20 backdrop-blur-md"
                >
                  <BsChevronRight size={18} />
                </button>
              )}

              {images.length > 1 && (
                <div className="flex gap-2 mt-6">
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === currentIndex
                          ? "bg-orange"
                          : "bg-text-muted/50"
                      }`}
                    ></span>
                  ))}
                </div>
              )}
            </div>

            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="w-full md:w-[45%] p-6 md:p-10 flex flex-col custom-scroll overflow-y-auto overscroll-contain relative"
            >
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
                  >
                    {showAllTech ? (
                      <BsChevronUp size={14} />
                    ) : (
                      <BsChevronDown size={14} />
                    )}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <BsPerson className="text-text-muted" size={14} />
                <span className="text-xs font-bold tracking-widest text-text-muted uppercase">
                  Role
                </span>
              </div>
              <p className="text-white/90 font-semibold text-sm mb-6">{role}</p>

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
                  {link.includes("github.com") ? (
                    <>
                      <BsGithub
                        className="text-text-muted group-hover:text-orange transition-colors"
                        size={20}
                      />
                      View Repository
                    </>
                  ) : (
                    <>
                      <BsLink45Deg
                        className="text-text-muted group-hover:text-orange transition-colors"
                        size={20}
                      />
                      Visit Site
                    </>
                  )}
                </a>
              </div>
            </div>
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToBottom}
                  className="cursor-pointer absolute bottom-6 right-6 md:bottom-8 md:right-8 z-40 p-3 rounded-full bg-orange/80 backdrop-blur-md border border-orange text-white hover:bg-orange transition-colors shadow-[0_0_15px_rgba(255,165,0,0.4)] animate-bounce"
                >
                  <BsChevronDoubleDown size={20} />
                </motion.button>
              )}
            </AnimatePresence>
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-3 right-3 md:top-4 md:right-4 z-50 p-2 rounded-full bg-black/60 md:bg-transparent text-white md:text-text-muted hover:text-white hover:bg-card-soft transition-all duration-300"
            >
              <BsX size={24} />
            </button>
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
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
};

export default ProjectPopup;
