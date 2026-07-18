import { useState } from "react";
import PropTypes from "prop-types";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";
import ProjectPopup from "./ProjectPopup";

const SingleProject = ({
  name,
  year,
  align,
  images,
  link,
  role,
  techStack,
  description,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <>
      <motion.div
        variants={fadeIn("top", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className={`flex w-full sm:flex-col-reverse items-center gap-8 ${
          align === "left" ? "md:flex-row" : "md:flex-row-reverse"
        } justify-end sm:flex-col`}
      >
        <div>
          <h2 className="md:text-3xl sm:text-2xl text-orange ">{name}</h2>
          <h2
            className={`text-xl font-thin text-white font-special sm:text-center ${
              align === "left" ? "md:text-right" : "md:text-left"
            }`}
          >
            {year}
          </h2>
          <button
            onClick={() => setIsPopupOpen(true)}
            className={`text-lg flex gap-2 items-center text-cyan hover:text-orange transition-all duration-500 cursor-pointer sm:justify-self-center mt-2 bg-transparent border-none p-0 ${
              align === "left" ? "md:justify-self-end" : "md:justify-self-start"
            }`}
          >
            View <BsFillArrowUpRightCircleFill />
          </button>
        </div>
        <div className="max-h-55 max-w-100 rounded-xl overflow-hidden hover:scale-110 transform transition-all duration-500 relative border border-white">
          {" "}
          <div className="w-full h-full bg-cyan opacity-50 absolute top-0 left-0 hover:opacity-0 transition-all duration-500 md:block sm:hidden"></div>
          <img src={images?.[0]} alt="website image" className="w-full h-full" />
        </div>
      </motion.div>
      <ProjectPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        name={name}
        year={year}
        images={images}
        link={link}
        role={role}
        techStack={techStack}
        description={description}
      />
    </>
  );
};

SingleProject.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
};

export default SingleProject;
