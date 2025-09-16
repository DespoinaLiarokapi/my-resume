import JobCard from "./JobCard"
import jobIcon from "../assets/images/job-icon-squares.svg"
import jobIcon2 from "../assets/images/job-icon-eclipse.svg"
import { IoMdDownload } from "react-icons/io"


export default function Experience(){
    return(


                <section
                  id="experience"
                  className="sm:py-8 py-4 flex flex-col gap-8 ">
        
                  <h1 className=" font-medium font-montserrat w-full mb-8 text-center  md:text-4xl text-3xl font-medium font-montserrat">Experience</h1>
                        
                
                  <div className="w-full lg:p-12 p-8 border border-muted-white/10 ">
                    <img
                      src={jobIcon}
                      alt="jobIcon"
                      className="w-full float-none sm:float-left max-w-[250px] sm:mr-6 mx-auto mb-8 sm:mb-2  object-contain"/>
                      
                    <div className="min-h-[250px] leading-relaxed space-y-5 pt-0.5">
                      
                      <div className="inline-block w-fit px-4 py-2 bg-muted-white/10 text-sm font-bold font-montserrat">
                        Mar 2025 - Present
                      </div>
                      <p className="md:text-xl sm:text-base [@media(max-width:274px)]:text-sm ">
                        <a href="https://acumino.ai/" className="hover:underline underline-offset-4 decoration-muted-white"> <strong className="font-bold font-montserrat uppercase">Acumino</strong></a>
                        <strong className="font-bold font-montserrat"> : </strong>
                        Served as a Junior UI/UX Designer and Front-End Developer Intern, rebuilding an internal GUI by migrating from a Python-based system (NiceGUI) to React, Vite, and Tailwind CSS to improve scalability, performance, and maintainability.
                        <br />Additionally, worked as a member of the team organizing the First 
                        <a href="https://humanoidolympiad.org/" className="hover:underline underline-offset-4 decoration-muted-white">
                          <strong className="font-bold font-montserrat"> International Humanoid Olympiad 2025</strong>
                        </a>
                        .
                      </p>
                      <a href={`${import.meta.env.BASE_URL}resume.pdf`} download className=" w-fit px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-center flex flex-row items-center gap-1 text-sm sm:text-base bg-muted-white text-dark hover:text-dark/90 hover:bg-white font-medium font-montserrat">
                        <IoMdDownload size={20} className="sm:size-6 lg:size-7 "/> Download my CV
                      </a>
                    </div>
                  </div>
        
                 <div className="">
        
                  <JobCard
                    icon={jobIcon2}
                    date="Sep 2025 - Present"
                    companyLink="https://www.mourelatos.gr/"
                    company="Mourelatos AE"
                    description="Serving as a Freelance Front-end Developer, recently started work on the redesign and development of the company’s official website"
                    buttonLink="https://www.mourelatos.gr/"
                  />
                  
                  </div>
        
        
                </section>



    );
}