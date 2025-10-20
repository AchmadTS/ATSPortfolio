import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import SingleInfo from "./SingleInfo";

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-4">
      <SingleInfo text="achmadtirtosudirosudiro@gmail.com" Image={HiOutlineMail} />
      <SingleInfo text="+6285878288920" Image={FiPhone} />
      <SingleInfo text="Karawang, Indonesia" Image={IoLocationOutline} />
    </div>
  );
};

export default ContactInfo;
