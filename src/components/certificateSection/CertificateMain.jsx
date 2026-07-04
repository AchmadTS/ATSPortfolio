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
    image: "/images/cert-frontend.webp",
    link: "/pdf/javascript_intermediate certificate.pdf",
  },
  {
    name: "Rest API (Intermediate)",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/cert-python.webp",
    link: "/pdf/java_basic certificate.pdf",
  },
  {
    name: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/cert-frontend.webp",
    link: "/pdf/javascript_intermediate certificate.pdf",
  },
  {
    name: "Node.js (Intermediate)",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/cert-frontend.webp",
    link: "/pdf/javascript_intermediate certificate.pdf",
  },
  {
    name: "Java (Basic)",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/cert-responsive.webp",
    link: "/pdf/java_basic certificate.pdf",
  },
  {
    name: "SQL (Advanced)",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/cert-js.webp",
    link: "/pdf/java_basic certificate.pdf",
  },
  {
    name: "Test 1",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/cert-js.webp",
    link: "/pdf/java_basic certificate.pdf",
  },
  {
    name: "Test 2",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/cert-js.webp",
    link: "/pdf/java_basic certificate.pdf",
  },
  {
    name: "Test 3",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/cert-js.webp",
    link: "/pdf/java_basic certificate.pdf",
  },
  {
    name: "Test 4",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/cert-js.webp",
    link: "/pdf/java_basic certificate.pdf",
  },
  {
    name: "Test 5",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/cert-js.webp",
    link: "/pdf/java_basic certificate.pdf",
  },
  {
    name: "Test 6",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/cert-js.webp",
    link: "/pdf/java_basic certificate.pdf",
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

  return (
    <div id="certificate" className="max-w-[1200px] mx-auto px-4">
      <motion.div
        variants={fadeIn("top", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
      >
        <CertificateText />
      </motion.div>
      <div className="relative max-w-[1000px] mx-auto mt-16">
        {showAll && pages.length > 1 && (
          <div className="absolute inset-y-0 -left-20 -right-20 flex items-center justify-between pointer-events-none">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="pointer-events-auto p-3 rounded-full border border-cyan text-cyan hover:bg-cyan hover:text-white transition-all bg-gray-900 disabled:opacity-30"
            >
              <FiChevronLeft size={30} />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(pages.length - 1, prev + 1))}
              disabled={currentPage === pages.length - 1}
              className="pointer-events-auto p-3 rounded-full border border-cyan text-cyan hover:bg-cyan hover:text-white transition-all bg-gray-900 disabled:opacity-30"
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
      </div>
      {certificates.length > 3 && (!showAll || currentPage === 0) && (
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setShowAll(!showAll);
              setCurrentPage(0);
            }}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-cyan text-cyan hover:bg-cyan hover:text-white transition-all duration-300"
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
