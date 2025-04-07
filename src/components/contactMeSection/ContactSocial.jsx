import SingleContactSocial from "./SingleContactSocial";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

const ContactSocial = () => {
  return (
    <div className="flex gap-4">
      <SingleContactSocial
        link="https://id.linkedin.com/in/achmad-tirto-sudiro-368aa6304"
        Icon={FaLinkedinIn}
      />
      <SingleContactSocial
        link="https://github.com/Achmadts/"
        Icon={FiGithub}
      />
      <SingleContactSocial
        link="https://www.instagram.com/achmadtirtosudiro/"
        Icon={FaInstagram}
      />
    </div>
  );
};

export default ContactSocial;
