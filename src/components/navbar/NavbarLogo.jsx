const NavbarLogo = () => {
  const handleClick = () => {
    const heroSection = document.getElementById("heroSection");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <h1
        className="text-white text-2xl sm:hidden md:block cursor-pointer"
        onClick={handleClick}
      >
        Achmad Tirto Sudiro
      </h1>
      <h1
        className="text-white font-special font-extrabold text-xl sm:text-2xl md:hidden cursor-pointer"
        onClick={handleClick}
      >
        ATS
      </h1>
    </div>
  );
};

export default NavbarLogo;
