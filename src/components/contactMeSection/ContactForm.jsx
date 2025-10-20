// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiDownload } from "react-icons/fi";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_k16fbth", "template_2etb25a", form.current, {
        publicKey: "_l1lSbUFXovxjJal0",
      })
      .then(
        () => {
          setEmail("");
          setName("");
          setMessage("");
          setSuccess(`Message Sent Successfully to "${email}"`);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div>
      <p className="text-cyan mb-2">{success}</p>
      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          autoComplete="off"
          required
          className="h-12 rounded-lg bg-transparent px-3 text-white placeholder-gray-400 border border-white/20 outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all duration-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="from_email"
          placeholder="Your Email"
          autoComplete="off"
          required
          className="h-12 rounded-lg bg-transparent px-3 text-white placeholder-gray-400 border border-white/20 outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          name="message"
          rows="6"
          autoComplete="off"
          placeholder="Message"
          required
          className="rounded-lg bg-transparent p-3 text-white placeholder-gray-400 border border-white/20 outline-none resize-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all duration-300"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="w-full rounded-lg border border-cyan text-white h-12 font-bold text-xl hover:bg-darkCyan bg-cyan transition-all duration-500"
        >
          Send
        </button>

        <a
          href="/pdf/Achmad Tirto Sudiro_KitaLulusCV.pdf"
          download
          className="w-full rounded-lg border border-white/20 text-white h-12 flex items-center justify-center gap-2 font-semibold text-lg hover:bg-white/10 transition-all duration-300"
        >
          <FiDownload size={22} />
          Download CV
        </a>
      </form>
    </div>
  );
};

export default ContactForm;
