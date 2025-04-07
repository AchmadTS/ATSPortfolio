import PropTypes from "prop-types";

const SingleSkill = ({ imgSvg, text, percentage }) => {
  return (
    <div className="hover:-translate-y-10 transition-all duration-500 group">
      <div className="flex flex-col items-center gap-2 relative">
        <div className="bg-white text-cyan h-[100px] w-[100px] flex items-center justify-center rounded-full hover:text-darkGrey hover:scale-105 transform transition-all duration-500 text-6xl border-4 border-orange">
          {imgSvg}
        </div>
        <p className="text-white font-bold">{text}</p>
        <p className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {percentage}%
        </p>
      </div>
      <div className="w-[100px] h-[200px] bg-orange absolute top-[50px] -z-10"></div>
    </div>
  );
};

SingleSkill.propTypes = {
  imgSvg: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
};

export default SingleSkill;
