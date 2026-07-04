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
    name: "Test",
    issuer: "HackerRank",
    year: "Jul 2025",
    image: "/images/cert-js.webp",
    link: "/pdf/java_basic certificate.pdf",
  },
];

const CertificateMain = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const staticCertificates = certificates.slice(0, 3);
  const extraCertificates = certificates.slice(3);
  const chunks = [];
  for (let i = 0; i < extraCertificates.length; i += 3) {
    chunks.push(extraCertificates.slice(i, i + 3));
  }

  const currentExtraItems = chunks[currentPage] || [];
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {staticCertificates.map((cert) => (
            <SingleCertificate key={cert.name} {...cert} />
          ))}
        </div>
        {showAll && certificates.length > 6 && (
          <div className="absolute inset-y-0 -left-20 -right-20 flex items-center justify-between pointer-events-none">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              className="pointer-events-auto p-3 rounded-full border border-cyan text-cyan hover:bg-cyan hover:text-white transition-all z-20 bg-gray-900"
            >
              <FiChevronLeft size={30} />
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(chunks.length - 1, prev + 1))
              }
              className="pointer-events-auto p-3 rounded-full border border-cyan text-cyan hover:bg-cyan hover:text-white transition-all z-20 bg-gray-900"
            >
              <FiChevronRight size={30} />
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          <AnimatePresence mode="wait">
            {showAll &&
              currentExtraItems.map((cert) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <SingleCertificate {...cert} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
      {certificates.length > 3 && (
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
