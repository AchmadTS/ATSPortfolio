import { PiHexagonThin } from "react-icons/pi";

const HeroImage = () => {
  return (
    <div className="relative self-end h-full w-full items-center justify-center">
      <div className="h-full w-full relative">
        <img
          src="/images/Me-Mobile.webp"
          alt="Achmad Tirto Sudiro"
          width="400"
          height="400"
          className="block md:hidden w-auto h-auto max-w-75 absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
        />

      <img
        src="/images/Me.webp"
        alt="Achmad Tirto Sudiro"
        width="800"
        height="1200"
        className=" hidden md:block max-h-112.5 w-auto aspect-2/3 object-cover transition-transform duration-300 hover:scale-105"
      />

        <div className="w-full h-full absolute bottom-[-20%] -z-10 flex justify-center items-center rotate-90">
          <PiHexagonThin className="md:h-[90%] h-[120%] min-h-150 w-auto text-orange opacity-70 animate-[spin_20s_linear_infinite]" />
        </div>

        <div className="w-full h-full absolute bottom-[-20%] -z-10 flex justify-center items-center rotate-90">
          <PiHexagonThin className="md:h-[90%] h-[120%] blur-lg min-h-150 w-auto text-orange opacity-70 animate-[spin_20s_linear_infinite]" />
        </div>

        <div className="w-full h-full absolute bottom-[-20%] -z-10 flex justify-center items-center">
          <PiHexagonThin className="md:h-[90%] h-[120%] min-h-150 w-auto text-cyan opacity-70 animate-[spin_20s_linear_infinite]" />
        </div>

        <div className="w-full h-full absolute bottom-[-20%] -z-10 flex justify-center items-center">
          <PiHexagonThin className="md:h-[90%] h-[120%] blur-lg min-h-150 w-auto text-cyan opacity-70 animate-[spin_20s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
