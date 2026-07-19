import ProjectsText from "./ProjectsText";
import SingleProject from "./SingleProject";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";

const projects = [
  {
    name: "Neskar Insight",
    year: "Sept2024",
    align: "right",
    images: ["/images/webNeskar.webp", "/images/webNeskar2.webp"],
    link: "https://smkn1karawang.sch.id/",
    role: "Back-End",
    techStack: [
      "Node.js + TypeScript",
      "Fastify",
      "Prisma ORM",
      "PostgreSQL",
      "Lucia Auth",
      "@fastify/cookie, cors, multipart, oauth2",
      "Nodemailer",
      "TypeBox",
      "Docker",
      "Dev Container",
      "pnpm",
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "Axios",
      "SWR",
      "Formik",
      "Quill / React Quill",
      "Sonner",
      "Tabler Icons / React Icons",
    ],
    description:
      "A modern full-stack web platform built for SMKN 1 Karawang, designed to deliver school information in a clean, responsive, and user-friendly interface. Neskar Insight combines a Fastify and Prisma-powered backend with a Next.js frontend to support a smooth experience for accessing content, managing data, and handling authentication. The project focuses on performance, maintainability, and a polished UI built with Tailwind CSS and DaisyUI.",
  },
  {
    name: "ATZuperr-Cashier",
    year: "Feb2025",
    align: "left",
    images: ["/images/Kasir.webp"],
    link: "https://github.com/Achmadts/ATZuperr-Cashier-FrontEnd",
    role: "Full-Stack",
    techStack: [
      "PHP 8.2",
      "Laravel 11",
      "Laravel Sanctum",
      "Laravel Socialite",
      "tymon/jwt-auth",
      "Maatwebsite Excel",
      "Scramble API Documentation",
      "Vite",
      "React 19",
      "JavaScript",
      "React Router DOM",
      "Tailwind CSS",
      "DaisyUI",
      "MUI",
      "Chart.js",
      "React Toastify",
      "Axios",
      "ExcelJS",
      "XLSX",
      "pnpm",
    ],
    description:
      "A modern cashier and inventory management system built for managing products, categories, purchases, sales, cashier data, and user authentication in one centralized platform. The project features a responsive React-based frontend and a Laravel backend with API support, social login, JWT authentication, and export capabilities for handling daily operational workflows more efficiently.",
  },
  {
    name: "TofuBase",
    year: "Jun2026",
    align: "right",
    images: [
      "/images/TofuBase1.webp",
      "/images/TofuBase2.webp",
      "/images/TofuBase3.webp",
      "/images/TofuBase4.webp",
      "/images/TofuBase5.webp",
      "/images/TofuBase6.webp",
      "/images/TofuBase7.webp",
      "/images/TofuBase8.webp",
      "/images/TofuBase9.webp",
      "/images/TofuBase10.webp",
    ],
    link: "https://github.com/achmadTS/TofuBase/",
    role: "Full-Stack",
    techStack: [
      "Java 25",
      "Maven",
      "Java Swing",
      "JDBC",
      "MySQL / MariaDB",
      "MySQL Connector/J 8.3.0",
      "DAO Pattern",
      "Custom Swing Components",
      "PDF / Receipt Export",
      "Database Seeder",
    ],
    description:
      "A desktop-based tofu factory management system built with Java Swing and MySQL to handle operational workflows in a centralized way. TofuBase provides role-based authentication, dashboard monitoring, and modules for managing raw materials, suppliers, products, customers, production, sales, inventory, finance, and user administration. The application is designed with a clean custom UI, structured data access layer, and automated database seeding to support efficient daily operations and easier testing.",
  },
];

const ProjectsMain = () => {
  return (
    <div id="projects" className="max-w-300 mx-auto px-4">
      <motion.div
        variants={fadeIn("top", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
      >
        <ProjectsText />
      </motion.div>
      <div className="flex flex-col gap-20 max-w-225 mx-auto mt-12">
        {projects.map((project, index) => {
          return (
            <SingleProject
              key={index}
              name={project.name}
              year={project.year}
              align={project.align}
              images={project.images}
              link={project.link}
              role={project.role}
              techStack={project.techStack}
              description={project.description}
            />
          );
        })}
      </div>
      <div className="w-full h-1 lg:mt-32 sm:mt-24 bg-lightBrown lg:block"></div>
    </div>
  );
};

export default ProjectsMain;
