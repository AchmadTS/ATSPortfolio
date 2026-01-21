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
        className="
          block md:hidden
          max-h-[240px]
          hover:max-h-[250px]
          w-auto
          transition-[max-height]
          duration-300
          ease-out
        "
      />

      <img
        src="/images/Me.webp"
        alt="Achmad Tirto Sudiro"
        className="
          hidden md:block
          max-h-[450px]
          w-auto
          transition-transform
          duration-300
          hover:scale-105
        "
      />

      <div className="absolute -z-10 flex justify-center items-center animate-pulse">
        <PiHexagonThin className="h-[320px] md:h-[600px] w-auto text-cyan blur-md" />
      </div>
    </motion.div>
  );
};

export default HeroPic;
