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
      className="relative h-full flex items-center justify-center"
    >
      <img
        src="/images/Me-Mobile.webp"
        alt="Achmad Tirto Sudiro"
        width="500"
        height="500"
        className="
          block md:hidden
          max-h-60
          w-auto
          hover:max-h-62.5
          transition-[max-height]
          duration-300
          ease-out
        "
      />

      <img
        src="/images/Me.webp"
        alt="Achmad Tirto Sudiro"
        width="800"
        height="1200" 
        className="
          hidden md:block
          max-h-112.5
          w-auto
          transition-transform
          duration-300
          hover:scale-105
        "
      />

      <div className="absolute -z-10 flex justify-center items-center animate-pulse">
        <PiHexagonThin className="h-80 md:h-150 w-auto text-cyan blur-md" />
      </div>
    </motion.div>
  );
};

export default HeroPic;
