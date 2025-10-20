import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";
import { FiArrowRightCircle } from "react-icons/fi";

const AboutMeText = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0 }}
      className="flex flex-col md:items-start sm:items-center md:text-left sm:text-center"
    >
      <h2 className="text-6xl text-cyan mb-10">About Me</h2>

      <p className="text-lightGrey leading-relaxed max-w-2xl">
        Hello! I&apos;m{" "}
        <span className="text-orange font-semibold">Achmad Tirto Sudiro</span>,
        a fresh graduate of{" "}
        <span className="text-cyan font-semibold">
          <a
            href="https://smkn1karawang.sch.id/"
            target="_blank"
            rel="noopener noreferrer"
          >
            SMKN 1 Karawang
          </a>
        </span>
        , majoring in{" "}
        <a
          href="https://bse.telkomuniversity.ac.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange font-semibold hover:underline hover:text-orange/80 transition-colors duration-200"
        >
          Software Engineering (Rekayasa Perangkat Lunak)
        </a>
        . My background in web development and administrative tasks has equipped
        me with a versatile skill set in both IT support and office
        administration. I have strong collaboration and project management
        skills, and I am proficient in several programming languages as well as
        Microsoft Office. I am highly motivated to continue learning and ready
        to take on new challenges.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="border border-orange rounded-full py-2 px-6 text-lg flex gap-2 items-center mt-10 
                   hover:bg-orange hover:text-white transition-all duration-500 cursor-pointer 
                   md:self-start sm:self-center group"
      >
        <Link
          spy={true}
          smooth={true}
          duration={500}
          offset={-120}
          to="projects"
          className="cursor-pointer text-white transition-all duration-500 flex gap-2 items-center"
        >
          My Projects
          <FiArrowRightCircle className="text-orange text-2xl transition-transform duration-500 group-hover:translate-x-1 group-hover:text-white" />
        </Link>
      </motion.button>
    </motion.div>
  );
};

export default AboutMeText;
