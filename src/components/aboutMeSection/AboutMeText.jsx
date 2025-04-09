import { Link } from "react-scroll";

const AboutMeText = () => {
  return (
    <div className="flex flex-col md:items-start sm:items-center md:text-left sm:text-center">
      <h2 className="text-6xl text-cyan mb-10">About Me</h2>
      <p>
        Hello! I&apos;m Achmad Tirto Sudiro, a recent graduate of SMKN 1
        Karawang, majoring in Software Engineering (Rekayasa Perangkat Lunak).
        My background in web development and administrative tasks has equipped
        me with a versatile skill set in both IT support and office
        administration. I have strong collaboration and project management
        skills, and I am proficient in several programming languages as well as
        Microsoft Office. I am highly motivated to continue learning and ready
        to take on new challenges.
      </p>
      <button className="border border-orange rounded-full py-2 px-4 text-lg flex gap-2 items-center mt-10 hover:bg-orange transition-all duration-500 cursor-pointer md:self-start sm:self-center">
        <Link
          spy={true}
          smooth={true}
          duration={500}
          offset={-120}
          to="projects"
          className="cursor-pointer text-white transition-all duration-500"
        >
          My Projects
        </Link>
      </button>
    </div>
  );
};

export default AboutMeText;
