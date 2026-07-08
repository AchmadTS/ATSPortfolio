import { useState } from "react";
import { FaHtml5, FaReact, FaJava } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoLogoJavascript } from "react-icons/io";
import { SiMysql, SiTypescript, SiLaravel, SiPhp } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";

const skills = [
  { skill: "HTML", icon: FaHtml5 },
  { skill: "JavaScript", icon: IoLogoJavascript },
  { skill: "TypeScript", icon: SiTypescript },
  { skill: "ReactJS", icon: FaReact },
  { skill: "Laravel", icon: SiLaravel },
  { skill: "PHP", icon: SiPhp },
  { skill: "MySQL", icon: SiMysql },
  { skill: "TailwindCSS", icon: RiTailwindCssFill },
  { skill: "Java", icon: FaJava },
];

const AllSkillsSM = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(skills.length / itemsPerPage);
  const paginatedSkills = skills.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return (
    <div className="relative my-8 px-4">
      <div className="overflow-hidden min-h-80">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-x-8 gap-y-10"
          >
            {paginatedSkills.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", 0.1)}
                className="flex flex-col items-center justify-center"
              >
                <item.icon className="text-6xl text-orange-500" />
                <p className="text-base font-medium text-white/90 mt-2">
                  {item.skill}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {skills.length > itemsPerPage && (
        <>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={isFirstPage}
            className="absolute left-0 top-[37.5%] -translate-y-1/2 p-2 text-cyan border border-cyan/30 rounded-full transition-all z-10 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-cyan/10"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={isLastPage}
            className="absolute right-0 top-[37.5%] -translate-y-1/2 p-2 text-cyan border border-cyan/30 rounded-full transition-all z-10 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-cyan/10"
          >
            <FiChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default AllSkillsSM;
