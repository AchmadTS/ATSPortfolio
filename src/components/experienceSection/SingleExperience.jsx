import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { fadeIn } from "../../framerMotion/variants";
import { FiFileText } from "react-icons/fi";

const SingleExperience = ({ experience, onViewCertificate }) => {
  return (
    <motion.div
      variants={fadeIn("right", 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.7 }}
      className="flex flex-col md:min-h-88 md:w-60 sm:h-auto sm:w-full border-2 border-orange border-dashed rounded-2xl mt-12 p-4"
    >
      <div className="md:flex-1">
        <p className="font-bold text-cyan">{experience.job}</p>
        <p className="text-orange">{experience.company}</p>
        <p className="text-lightGrey">{experience.date}</p>
        <ul className="list-disc mt-4 pl-4 text-sm">
          {experience.responsibilities.map((resp, index) => {
            return <li key={index}>{resp}</li>;
          })}
        </ul>
      </div>

      {experience.certificate && (
        <button
          onClick={() => onViewCertificate(experience.certificate)}
          className="mt-4 md:mt-6 w-full flex justify-center items-center gap-2 px-4 py-2 text-xs font-medium 
                     text-cyan border border-cyan/30 bg-cyan/5 rounded-lg 
                     hover:bg-cyan hover:text-white transition-all duration-300 cursor-pointer shrink-0"
        >
          <FiFileText className="w-4 h-4 shrink-0" />
          <span>Lihat Surat Keterangan</span>
        </button>
      )}
    </motion.div>
  );
};

SingleExperience.propTypes = {
  experience: PropTypes.shape({
    job: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    certificate: PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onViewCertificate: PropTypes.func.isRequired,
};

export default SingleExperience;
