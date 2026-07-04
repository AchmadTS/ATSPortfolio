import CertificateText from "./CertificateText";
import SingleCertificate from "./SingleCertificate";
import { motion } from "framer-motion";
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
];

const CertificateMain = () => {
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
        {certificates.map((cert, index) => {
          return (
            <SingleCertificate
              key={index}
              name={cert.name}
              issuer={cert.issuer}
              year={cert.year}
              image={cert.image}
              link={cert.link}
            />
          );
        })}
      </div>      
      <div className="w-full h-1 lg:mt-32 sm:mt-24 bg-lightBrown lg:block"></div>
    </div>
  );
};

export default CertificateMain;