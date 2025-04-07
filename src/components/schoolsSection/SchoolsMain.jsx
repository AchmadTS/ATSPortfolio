import SchoolsText from "./SchoolsText";
import SingleSchool from "./SingleSchool";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";

const schools = [
  {
    name: "SMKN 1 Karawang",
    year: "2022-2025",
    align: "right",
    image: "/images/smkn1karawang.jpg",
    mapsLink: "https://maps.app.goo.gl/ikchpUEKRUK5tC248",
  },
  {
    name: "SMPN 3 Klari",
    year: "2019-2021",
    align: "left",
    image: "/images/Tiklar.jpg",
    mapsLink: "https://maps.app.goo.gl/p2jFU8dd6GK4SBo78",
  },
  {
    name: "SDN Pancawati 2",
    year: "2013-2018",
    align: "right",
    image: "/images/PWT2.jpg",
    mapsLink: "https://maps.app.goo.gl/hQ8qUdwTweyJQ4N2A",
  },
  {
    name: "Al-Hidayah",
    year: "2011-2012",
    align: "left",
    image: "/images/TK.jpg",
    mapsLink: "https://maps.app.goo.gl/NJbvpDjWDdiJynXa6",
  },
];

const SchoolsMain = () => {
  return (
    <div id="education" className="max-w-[1200px] mx-auto px-4">
      <motion.div
        variants={fadeIn("top", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
      >
        <SchoolsText />
      </motion.div>
      <div className="flex flex-col gap-20 max-w-[900px] mx-auto mt-12">
        {schools.map((school, index) => {
          return (
            <SingleSchool
              key={index}
              name={school.name}
              year={school.year}
              align={school.align}
              image={school.image}
              mapsLink={school.mapsLink}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SchoolsMain;
