import { useState } from "react";
import PropTypes from "prop-types";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";
import PdfViewer from "../contactMeSection/PdfViewer";

const SingleCertificate = ({ name, issuer, year, link }) => {
  const [showPdf, setShowPdf] = useState(false);
  const pdfData = {
    path: link,
    name: name,
    type: "certificate",
  };

  return (
    <>
      <motion.div
        variants={fadeIn("top", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="flex flex-col items-center w-full gap-5 group"
      >
        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden transform transition-all duration-500 relative border border-white hover:scale-105">
          <div className="w-full h-full bg-cyan opacity-50 absolute top-0 left-0 group-hover:opacity-0 transition-all duration-500 z-10 md:block sm:hidden pointer-events-none"></div>{" "}
          <iframe
            src={`${link}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            title={name}
            className="w-full h-full object-cover pointer-events-none"
            tabIndex={-1}
          />
        </div>
        <div className="flex flex-col items-center w-full text-center">
          <h2 className="text-2xl text-orange font-semibold">{name}</h2>
          <h2 className="text-lg font-thin text-white font-special mt-1">
            {issuer} • {year}
          </h2>
          <button
            onClick={() => setShowPdf(true)}
            className="mt-3 text-lg flex gap-2 items-center text-cyan hover:text-orange transition-all duration-500 cursor-pointer"
          >
            View Credential <BsFillArrowUpRightCircleFill />
          </button>
        </div>
      </motion.div>
      <PdfViewer
        show={showPdf}
        currentPdf={pdfData}
        onClose={() => setShowPdf(false)}
      />
    </>
  );
};

SingleCertificate.propTypes = {
  name: PropTypes.string.isRequired,
  issuer: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default SingleCertificate;
