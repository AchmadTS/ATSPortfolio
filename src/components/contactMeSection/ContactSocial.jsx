import SingleContactSocial from "./SingleContactSocial";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

const ContactSocial = () => {
  return (
    <div className="flex gap-4">
      <SingleContactSocial
        link="https://id.linkedin.com/in/achmad-tirto-sudiro-368aa6304"
        Icon={FaLinkedinIn} aria-label="Kunjungi Profil LinkedIn"
      />
      <SingleContactSocial
        link="https://github.com/Achmadts/"
        Icon={FiGithub} aria-label="Kunjungi Profil GitHub"
      />
      <SingleContactSocial
        link="https://www.instagram.com/ats090906/"
        Icon={FaInstagram} aria-label="Kunjungi Profil Instagram"
      />
    </div>
  );
};

export default ContactSocial;
