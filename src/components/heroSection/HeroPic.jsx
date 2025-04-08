import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";
import { PiHexagonThin } from "react-icons/pi";

const HeroPic = () => {
  return (
    <motion.div
      variants={fadeIn("left", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0 }}
      className=" h-full flex items-center justify-center "
    >
      <img
        src="/images/Me.webp"
        alt="Achmad Tirto Sudiro"
        className="max-h-[450px] w-auto"
      />

      <div className=" absolute -z-10 flex justify-center items-center animate-pulse ">
        <PiHexagonThin className="h-[440px] md:h-[600px] w-auto text-cyan blur-md" />
      </div>
    </motion.div>
  );
};

export default HeroPic;
