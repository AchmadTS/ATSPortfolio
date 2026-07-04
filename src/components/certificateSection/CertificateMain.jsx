import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import CertificateText from "./CertificateText";
import SingleCertificate from "./SingleCertificate";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";

const certificates = [
  {
    name: "JavaScript (Intermediate)",
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

  // {
  //   name: "Python Basics",
  //   issuer: "HackerRank",
  //   year: "Aug 2025",
  //   image: "/images/cert-python.webp",
  //   link: "/pdf/java_basic certificate.pdf",
  // },
];

const CertificateMain = () => {
  const [showAll, setShowAll] = useState(false);  
  const staticCertificates = certificates.slice(0, 3);
  const extraCertificates = certificates.slice(3);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1000px] mx-auto mt-16">
        {staticCertificates.map((cert) => (
          <SingleCertificate
            key={cert.name}
            name={cert.name}
            issuer={cert.issuer}
            year={cert.year}
            link={cert.link}
          />
        ))}
        <AnimatePresence>
          {showAll && extraCertificates.map((cert) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <SingleCertificate
                name={cert.name}
                issuer={cert.issuer}
                year={cert.year}
                link={cert.link}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {certificates.length > 3 && (
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAll(!showAll)}
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
