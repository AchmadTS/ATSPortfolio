import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { fadeIn } from "../../framerMotion/variants";

const SingleSchool = ({ name, year, align, image, mapsLink }) => {
  return (
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
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange hover:underline md:text-3xl sm:text-2xl block"
        >
          {name}
        </a>
        <h2
          className={`text-xl font-thin text-white font-special sm:text-center ${
            align === "left" ? "md:text-right" : "md:text-left"
          }`}
        >
          {year}
        </h2>
      </div>
      <div className="max-h-[220px] max-w-[400px] rounded-xl overflow-hidden hover:scale-110 transform transition-all duration-500 relative border border-white">
        <div className="w-full h-full bg-cyan opacity-50 absolute top-0 left-0 hover:opacity-0 transition-all duration-500 md:block sm:hidden"></div>
        <img src={image} alt="website image" className="w-full h-full" />
      </div>
    </motion.div>
  );
};

SingleSchool.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  align: PropTypes.oneOf(["left", "right"]).isRequired,
  image: PropTypes.string.isRequired,
  mapsLink: PropTypes.string.isRequired,
};

export default SingleSchool;
