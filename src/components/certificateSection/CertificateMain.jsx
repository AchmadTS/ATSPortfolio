import { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import CertificateText from "./CertificateText";
import SingleCertificate from "./SingleCertificate";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";

const certificates = [
  {
    name: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/Problem Solving (Intermediate).webp",
    link: "/pdf/problem_solving_intermediate certificate.pdf",
  },
  {
    name: "Rest API (Intermediate)",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/Rest API (Intermediate).webp",
    link: "/pdf/rest_api_intermediate certificate.pdf",
  },
  {
    name: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/JavaScript (Intermediate).webp",
    link: "/pdf/javascript_intermediate certificate.pdf",
  },
  {
    name: "Node.js (Intermediate)",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/nodejs_intermediate certificate.webp",
    link: "/pdf/nodejs_intermediate certificate.pdf",
  },
  {
    name: "Java (Basic)",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/Java (Basic).webp",
    link: "/pdf/java_basic certificate.pdf",
  },
  {
    name: "SQL (Advanced)",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/SQL (Advanced).webp",
    link: "/pdf/sql_advanced certificate.pdf",
  },
];

const CertificateMain = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_SIZE = 6;
  const pages = [];

  for (let i = 0; i < certificates.length; i += PAGE_SIZE) {
    pages.push(certificates.slice(i, i + PAGE_SIZE));
  }

  const displayedCertificates = showAll
    ? pages[currentPage]
    : certificates.slice(0, 3);
  const animationKey = showAll ? `page-${currentPage}` : "collapsed";
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setTimeout(() => {
      const section = document.getElementById("certificate");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  return (
    <div id="certificate" className="max-w-300 mx-auto px-4">
      <motion.div
        variants={fadeIn("top", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
      >
        <CertificateText />
      </motion.div>

      <div className="relative max-w-250 mx-auto mt-16">
        {showAll && pages.length > 1 && (
          <div className="hidden md:flex absolute inset-y-0 -left-20 -right-20 items-center justify-between pointer-events-none">
            <button
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              aria-label="Previous page"
              className="cursor-pointer pointer-events-auto p-3 rounded-full border border-cyan text-cyan hover:bg-cyan hover:text-white transition-all bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:hover:text-cyan"
            >
              <FiChevronLeft size={30} />
            </button>
            <button
              onClick={() =>
                handlePageChange(Math.min(pages.length - 1, currentPage + 1))
              }
              disabled={currentPage === pages.length - 1}
              aria-label="Next page"
              className="cursor-pointer pointer-events-auto p-3 rounded-full border border-cyan text-cyan hover:bg-cyan hover:text-white transition-all bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:hover:text-cyan"
            >
              <FiChevronRight size={30} />
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={animationKey}
            variants={fadeIn("top", 0)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {displayedCertificates.map((cert) => (
              <SingleCertificate key={cert.name} {...cert} />
            ))}
          </motion.div>
        </AnimatePresence>

        {showAll && pages.length > 1 && (
          <div className="flex md:hidden justify-center items-center gap-6 mt-10">
            <button
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              aria-label="Previous page"
              className="cursor-pointer p-3 rounded-full border border-cyan text-cyan hover:bg-cyan hover:text-white transition-all bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:hover:text-cyan"
            >
              <FiChevronLeft size={24} />
            </button>
            <span className="text-white font-special">
              {currentPage + 1} / {pages.length}
            </span>
            <button
              onClick={() =>
                handlePageChange(Math.min(pages.length - 1, currentPage + 1))
              }
              disabled={currentPage === pages.length - 1}
              aria-label="Next page"
              className="cursor-pointer p-3 rounded-full border border-cyan text-cyan hover:bg-cyan hover:text-white transition-all bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:hover:text-cyan"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      {certificates.length > 3 && (!showAll || currentPage === 0) && (
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setShowAll(!showAll);
              setCurrentPage(0);
              if (showAll) {
                setTimeout(() => {
                  document
                    .getElementById("certificate")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 150);
              }
            }}
            aria-label={
              showAll ? "Show less certificates" : "Show more certificates"
            }
            className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full border border-cyan text-cyan hover:bg-cyan hover:text-white transition-all duration-300"
          >
            {showAll ? <FiChevronUp size={28} /> : <FiChevronDown size={28} />}
          </motion.button>
        </div>
      )}

      <div className="w-full h-1 lg:mt-32 sm:mt-24 bg-lightBrown lg:block"></div>
    </div>
  );
};

export default CertificateMain;
