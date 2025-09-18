import { GrLinkedin } from "react-icons/gr"
import { GrGithub } from "react-icons/gr"
import { FaPhone } from "react-icons/fa"
import { SiMaildotru } from "react-icons/si"

export default function Footer(){
    return(
         <footer className="lg:px-[12.5rem] md:px-20 p-6 flex flex-col md:flex-row items-center md:justify-between gap-4 border border-muted-white/10 font-light font-poppins">
        
      <p className=" text-center text-md sm:text-base">&copy; 2025 All rights reserved.</p>

      <div className="flex flex-row items-center gap-6">
        <a href="https://github.com/DespoinaLiarokapi" className="hover:text-gray">
          <GrGithub className="w-6 h-6 sm:w-7 sm:h-7" />
        </a>
       
        <a href="https://www.linkedin.com/in/despoina-vasiliki-liarokapi" className="hover:text-gray">
          <GrLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>

        <a
          href="mailto:despoinaliarokapi@gmail.com"
          className=" hover:text-gray"
          aria-label="Email"
        >
          <SiMaildotru className="w-5 h-5 sm:w-6 sm:h-6" />

        </a>


        <a href="tel:+306970015984" className="hover:text-gray" aria-label="Phone">
          <FaPhone className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>

      
      </div>

    </footer>

    );
}