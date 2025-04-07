import SingleExperience from "./SingleExperience";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";

const experiences = [
  // {
  //   job: "Student",
  //   company: "SMKN 1 Karawang",
  //   date: "2024",
  //   responsibilities: [
  //     "Entered and managed data using Microsoft Excel.",
  //     "Retrieved office supplies (ATK) from the warehouse.",
  //     "Delivered and collected documents between departments.",
  //   ],
  // },
  {
    job: "Internship",
    company: "Bukit Muria Jaya",
    date: "2024",
    responsibilities: [
      "Entered and managed data using Microsoft Excel.",
      "Retrieved office supplies (ATK) from the warehouse.",
      "Delivered and collected documents between departments.",
    ],
  },
  {
    job: "Internship",
    company: "ICT SMKN 1 Karawang",
    date: "2024",
    responsibilities: [
      "Performed routine maintenance and cleaning of the ICT lab.",
      "Built a web-based attendance application for teachers using modern web technologies.",
      "Designed and developed a functional website for the school.",
    ],
  },
];

const AllExperiences = () => {
  return (
    <div className="flex md:flex-row sm:flex-col items-center justify-center gap-8 flex-wrap">
      {experiences.map((experience, index) => {
        return (
          <div key={index}>
            <SingleExperience experience={experience} />
            {index < 2 ? (
              <motion.div
                variants={fadeIn("right", 0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.7 }}
              >
                <FaArrowRightLong className="text-6xl text-orange lg:block sm:hidden" />
              </motion.div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default AllExperiences;
