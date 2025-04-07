import ProjectsText from "./SchoolsText";
import SingleProject from "./SingleSchool";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";

const schools = [
  {
    name: "SMKN 1 Karawang",
    year: "2024-2025",
    align: "right",
    image: "../../public/images/website-img-1.jpg",
  },
  {
    name: "SMPN 3 Klari",
    year: "2024-2025",
    align: "left",
    image: "../../public/images/GoExpertLite.png",
  },
  {
    name: "SDN Pancawati 2",
    year: "2024-2025",
    align: "right",
    image: "../../public/images/website-img-3.jpg",
  },
];

const SchoolsMain = () => {
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
        {schools.map((school, index) => {
          return (
            <SingleProject
              key={index}
              name={school.name}
              year={school.year}
              align={school.align}
              image={school.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SchoolsMain;
