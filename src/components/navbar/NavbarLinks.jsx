import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../state/menuSlice";

const links = [
  { link: "About Me", section: "about" },
  { link: "Skills", section: "skills" },
  { link: "Experiences", section: "experience" },
  { link: "Projects", section: "projects" },
  { link: "Certificates", section: "certificate" },
  { link: "Education", section: "education" },
  { link: "Contact", section: "contact" },
];

const NavbarLinks = () => {
  const dispatch = useDispatch();
  const menuOpen = useSelector((state) => state.menu.menuOpen);
  const handleLinkClick = () => {
    if (menuOpen) {
      dispatch(toggleMenu());
    }
  };

  return (
    <ul className="flex lg:flex-row sm:flex-col gap-6 text-white font-body lg:relative sm:absolute sm:top-[120%] text-center left-[50%] translate-x-[-50%] lg:text-md sm:text-xl sm:bg-cyan/30 backdrop-blur-lg lg:bg-black sm:w-full py-4">
      {links.map((link, index) => {
        return (
          <li key={index} className="group">
            <Link
              spy={true}
              smooth={true}
              duration={500}
              offset={-130}
              to={link.section}
              activeClass="active"
              className="cursor-pointer text-white hover:text-cyan transition-all duration-500"
              onClick={handleLinkClick}
            >
              {link.link}
            </Link>
            <div className="mx-auto bg-cyan w-0 group-hover:w-full h-px transition-all duration-500"></div>
          </li>
        );
      })}
    </ul>
  );
};

export default NavbarLinks;
