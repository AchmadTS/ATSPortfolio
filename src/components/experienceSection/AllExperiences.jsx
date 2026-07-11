import SingleExperience from "./SingleExperience";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";
import PropTypes from "prop-types";

const experiences = [
  {
    job: "Internship",
    company: "Bukit Muria Jaya",
    date: "2024",
    responsibilities: [
      "Entered and managed data using Microsoft Excel.",
      "Retrieved office supplies (ATK) from the warehouse.",
      "Delivered and collected documents between departments.",
    ],
    certificate: {
      path: "/pdf/36.PKL.HRD.VII.2024_ACHMAD TIRTO SUDIRO.pdf",
      name: "Surat Keterangan PKL PT Bukit Muria Jaya",
      type: "certificate",
    },
  },
  {
    job: "Internship",
    company: "ICT SMKN 1 Karawang",
    date: "2024",
    responsibilities: [
      "Performed routine maintenance and cleaning of the ICT lab.",
      "Built a web-based attendance application for teachers using modern web technologies.",
      "Designed and developed a functional website for the school.",
    ],
    // certificate: {
    //   path: "/pdf/sertifikat-ict.pdf",
    //   name: "Sertifikat PKL ICT SMKN 1 Karawang",
    //   type: "certificate",
    // },
  },
];

const AllExperiences = ({ onViewCertificate }) => {
  return (
    <div className="flex md:flex-row sm:flex-col items-center justify-center gap-8 flex-wrap">
      {experiences.map((experience, index) => {
        return (
          <div
            key={index}
            className="flex md:flex-row sm:flex-col items-center gap-8"
          >
            <SingleExperience
              experience={experience}
              onViewCertificate={onViewCertificate}
            />
            {index < experiences.length - 1 ? (
              <motion.div
                variants={fadeIn("right", 0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.7 }}
              >
                <FaArrowRightLong className="text-6xl text-orange lg:block sm:hidden" />
              </motion.div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

AllExperiences.propTypes = {
  onViewCertificate: PropTypes.func.isRequired,
};

export default AllExperiences;
