import { Link } from "react-scroll";

const FooterMain = () => {
  const handleClick = () => {
    const heroSection = document.getElementById("heroSection");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const footerLinks = [
    { name: "About Me", section: "about" },
    { name: "Skills", section: "skills" },
    { name: "Experience", section: "experience" },
    { name: "Projects", section: "projects" },
    { name: "Certificates", section: "certificate" },
    { name: "Education", section: "education" },
  ];
  return (
    <div className="px-4">
      <div className="w-full h-px bg-lightGrey mt-24"></div>
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between mt-8 max-w-300 mx-auto gap-6 md:gap-0">
        <p
          className="text-2xl md:text-3xl text-lightGrey relative cursor-pointer hover:text-white transition-all duration-500 text-center md:text-left"
          onClick={handleClick}
        >
          Achmad Tirto Sudiro
        </p>

        <ul className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 text-lightGrey text-base md:text-xl max-w-md md:max-w-none">
          {footerLinks.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-120}
                  to={item.section}
                  className="hover:text-white transition-all duration-500 cursor-pointer"
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="max-w-300 mx-auto text-center md:text-right mt-10 md:mt-4 mb-12 text-sm text-lightBrown">
        © {new Date().getFullYear()} Achmad Tirto Sudiro | All Rights Reserved.
      </p>
    </div>
  );
};

export default FooterMain;
