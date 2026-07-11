import { useState } from "react";
import AllExperiences from "./AllExperiences";
import ExperienceText from "./ExperienceText";
import ExperienceTop from "./ExperienceTop";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";
import PdfViewer from "../contactMeSection/PdfViewer";

const ExperienceMain = () => {
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [currentPdfData, setCurrentPdfData] = useState(null);
  const handleOpenCertificate = (pdfInfo) => {
    setCurrentPdfData(pdfInfo);
    setIsPdfOpen(true);
  };

  return (
    <div id="experience" className="max-w-300 mx-auto px-4 relative">
      <motion.div
        variants={fadeIn("down", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
      >
        <ExperienceText />
      </motion.div>
      <motion.div
        variants={fadeIn("down", 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
      >
        <ExperienceTop />
      </motion.div>
      <div className="w-full h-1 mt-4 bg-lightBrown lg:block sm:hidden"></div>
      <AllExperiences onViewCertificate={handleOpenCertificate} />
      <PdfViewer
        show={isPdfOpen}
        currentPdf={currentPdfData}
        onClose={() => setIsPdfOpen(false)}
      />
    </div>
  );
};

export default ExperienceMain;
