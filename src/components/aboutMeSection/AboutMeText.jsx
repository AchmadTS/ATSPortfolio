import { Link } from "react-scroll";

const AboutMeText = () => {
  return (
    <div className="flex flex-col md:items-start sm:items-center md:text-left sm:text-center">
      <h2 className="text-6xl text-cyan mb-10">About Me</h2>
      <p>
        My name is Achmad Tirto Sudiro, but people usually call me Achmad. I was
        born in Karawang on September 9, 2006. I am currently a 12th-grade
        student at SMKN 1 Karawang, majoring in Software Engineering (RPL). My
        hobbies are playing games and coding. I completed my elementary
        education at SD Negeri Pancawati 2, then continued my studies at SMP
        Negeri 3 Klari, which is still located in Karawang Regency. After that,
        I pursued my education at SMK Negeri 1 Karawang. That&apos;s a little story
        about me. Thank you!
      </p>
      <button className="border border-orange rounded-full py-2 px-4 text-lg flex gap-2 items-center mt-10 hover:bg-orange transition-all duration-500 cursor-pointer md:self-start sm:self-center">
        <Link
          spy={true}
          smooth={true}
          duration={500}
          offset={-120}
          to="projects"
          className="cursor-pointer text-white hover:text-cyan transition-all duration-500"
        >
          My Projects
        </Link>
      </button>
    </div>
  );
};

export default AboutMeText;
