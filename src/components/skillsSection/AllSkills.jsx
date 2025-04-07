import SingleSkill from "./SingleSkill";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiLaravel, SiTypescript, SiPhp, SiBootstrap } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";

const skills = [
  {
    skill: "HTML",
    percentage: "70",
    icon: FaHtml5,
  },
  {
    skill: "CSS",
    percentage: "50",
    icon: FaCss3Alt,
  },
  {
    skill: "JavaScript",
    percentage: "50",
    icon: IoLogoJavascript,
  },
  {
    skill: "TypeScript",
    percentage: "30",
    icon: SiTypescript,
  },
  {
    skill: "ReactJS",
    percentage: "75",
    icon: FaReact,
  },
  {
    skill: "Laravel",
    percentage: "80",
    icon: SiLaravel,
  },
  {
    skill: "PHP",
    percentage: "65",
    icon: SiPhp,
  },
  {
    skill: "TailwindCSS",
    percentage: "65",
    icon: RiTailwindCssFill,
  },
  {
    skill: "Bootstrap",
    percentage: "65",
    icon: SiBootstrap,
  },
];

const AllSkills = () => {
  return (
    <div>
      <div className="flex items-center justify-center relative gap-2 max-w-[1200px] mx-auto">
        {skills.map((item, index) => {
          return (
            <motion.div
              variants={fadeIn("up", `0.${index}`)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0 }}
              key={index}
            >
              <SingleSkill
                key={index}
                text={item.skill}
                percentage={item.percentage}
                imgSvg={<item.icon />}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AllSkills;
