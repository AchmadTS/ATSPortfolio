import PropTypes from "prop-types";

const SingleContactSocial = ({ Icon, link }) => {
  return (
    <a
      href={link}
      className="text-2xl h-12 w-12 border border-orange text-orange rounded-full p-3 flex items-center justify-center cursor-pointer
                 hover:bg-orange hover:border-darkOrange hover:text-white transition-colors duration-500"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon />
    </a>
  );
};

SingleContactSocial.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  link: PropTypes.string.isRequired,
};

export default SingleContactSocial;
