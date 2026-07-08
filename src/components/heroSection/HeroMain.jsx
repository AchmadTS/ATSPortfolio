import HeroText from "./HeroText";
import HeroPic from "./HeroPic";

const HeroMain = () => {
  return (
    <div id="heroSection" className="pt-40 pb-16">
      <div className="flex md:flex-row sm:flex-col  max-w-300 mx-auto justify-between items-center relative px-4">
        <HeroText />
        <HeroPic />
      </div>
    </div>
  );
};

export default HeroMain;
