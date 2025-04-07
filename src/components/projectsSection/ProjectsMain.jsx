import ProjectsText from "./ProjectsText";
import SingleProject from "./SingleProject";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";

const projects = [
  {
    name: "Neskar Insight",
    year: "Sept2024",
    align: "right",
    image: "../../public/images/website-img-1.jpg",
    link: "#",
  },
  {
    name: "GoExpertLite Front-End",
    year: "Mar2025",
    align: "left",
    image: "../../public/images/GoExpertLite.png",
    link: "https://go-expert-lite.vercel.app/",
  },
  {
    name: "Sianes",
    year: "Okt2024",
    align: "right",
    image: "../../public/images/website-img-3.jpg",
    link: "#",
  },
];

const ProjectsMain = () => {
  return (
    <div id="projects" className="max-w-[1200px] mx-auto px-4">
      <motion.div
        variants={fadeIn("top", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
      >
        <ProjectsText />
      </motion.div>
      <div className="flex flex-col gap-20 max-w-[900px] mx-auto mt-12">
        {projects.map((project, index) => {
          return (
            <SingleProject
              key={index}
              name={project.name}
              year={project.year}
              align={project.align}
              image={project.image}
              link={project.link}
            />
          );
        })}
      </div>
      <div className="w-full h-1 mt-32 bg-lightBrown lg:block sm:hidden"></div>
    </div>
  );
};

export default ProjectsMain;
