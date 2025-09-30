import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";
import { LuMessageSquareCode } from "react-icons/lu";
import ChatMain from "../chatPopup/ChatMain";

const HeroText = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 h-full justify-center md:text-left sm:text-center relative">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="flex items-center justify-center md:justify-start gap-2"
      >
        <h2 className="lg:text-2xl sm:text-xl uppercase text-lightGrey">
          Student
        </h2>

        <span className="md:hidden">
          <LuMessageSquareCode
            className="text-orange text-2xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </span>
      </motion.div>

      <motion.h1
        variants={fadeIn("right", 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="md:text-[2.8rem] lg:text-6xl sm:text-4xl text-orange font-bold uppercase"
      >
        Achmad Tirto <br className="sm:hidden md:block" />
        Sudiro
      </motion.h1>

      <motion.p
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="text-lg mt-4"
      >
        Student at SMKN 1 KARAWANG majoring in <br /> Software Engineering.
      </motion.p>

      <motion.div
        variants={fadeIn("up", 0.8)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="hidden md:flex justify-start"
      >
        <LuMessageSquareCode
          className="text-orange text-3xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </motion.div>

      <ChatMain isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default HeroText;
