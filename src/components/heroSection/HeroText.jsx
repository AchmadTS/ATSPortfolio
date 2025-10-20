import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";
import { LuMessageSquareCode } from "react-icons/lu";
import ChatMain from "../chatPopup/ChatMain";

const HeroText = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full justify-center md:text-left sm:text-center relative">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="flex items-center justify-center md:justify-start gap-2"
      >
        <h2 className="lg:text-2xl sm:text-xl uppercase text-lightGrey tracking-wide">
          Student
        </h2>

        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="md:hidden">
            <LuMessageSquareCode
              className="text-orange text-2xl cursor-pointer hover:text-cyan transition-colors duration-300"
              onClick={() => setIsOpen(true)}
            />
          </span>
        </motion.div>
      </motion.div>

      <motion.h1
        variants={fadeIn("right", 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="md:text-[2.8rem] lg:text-6xl sm:text-4xl text-orange font-bold uppercase leading-tight"
      >
        Achmad Tirto <br className="sm:hidden md:block" />
        Sudiro
      </motion.h1>

      <motion.p
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="text-base md:text-lg -mt-1 md:mt-3 mb-3 md:mb-0 text-lightGrey leading-relaxed max-w-xl"
      >
        Currently pursuing an undergraduate degree in{" "}
        <a
          href="https://bse.telkomuniversity.ac.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange font-semibold hover:underline hover:text-orange/80 transition-colors duration-200"
        >
          Software Engineering{" "}
        </a>
        at{" "}
        <a
          href="https://telkomuniversity.ac.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan font-semibold hover:underline hover:text-cyan/80 transition-colors duration-200"
        >
          Telkom University
        </a>
        .
        <br />
        Passionate about software development, design, and innovation.
      </motion.p>

      <motion.div
        variants={fadeIn("up", 0.8)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="hidden md:flex justify-start mt-2"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <LuMessageSquareCode
            className="text-orange text-3xl cursor-pointer hover:text-cyan transition-colors duration-300"
            onClick={() => setIsOpen(true)}
          />
        </motion.div>
      </motion.div>

      <ChatMain isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default HeroText;
