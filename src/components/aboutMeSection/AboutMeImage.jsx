const AboutMeImage = () => {
  return (
    <div className="h-125 w-75 relative hidden md:block">
      <div className="h-125 w-75 rounded-[100px] absolute overflow-hidden">
        <img
          src="/images/abot_me.webp"
          alt="About Me Image"
          width="300"
          height="500"
          className="h-full w-auto object-cover"
        />
      </div>
    </div>
  );
};

export default AboutMeImage;
