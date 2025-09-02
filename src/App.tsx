import { MdAlternateEmail } from "react-icons/md"
import { TiSocialLinkedinCircular } from "react-icons/ti"
import { SiGithub } from "react-icons/si"
import { FaPhoneAlt, FaBars } from "react-icons/fa"
import { useState, useRef } from "react"
import { CheckIcon, ChevronDown } from "lucide-react"
import JobCard from "./components/JobCard"
import jobIcon from "./assets/images/job-icon-squares.svg"
import Profile from "./assets/images/profile0.png"
import Shapes from "./assets/shapes.gif"
import { IoMdDownload } from "react-icons/io"
import emailjs from '@emailjs/browser';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"
import RequiredFieldPopUp from "./components/RequiredFieldPopUp"
import jobIcon2 from "./assets/images/job-icon-eclipse.svg"
import { AiOutlineMenu } from "react-icons/ai";


const countries = [
  
  { code: "GR", name: "Greece", callingCode: "30", flag: "🇬🇷" },
  { code: "US", name: "United States", callingCode: "1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", callingCode: "44", flag: "🇬🇧" },
  { code: "DE", name: "Germany", callingCode: "49", flag: "🇩🇪" },
  { code: "FR", name: "France", callingCode: "33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", callingCode: "39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", callingCode: "34", flag: "🇪🇸" },
  { code: "CA", name: "Canada", callingCode: "1", flag: "🇨🇦" },
]

export default function App() {

  const pKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
   
  const [isDropMenuOpen, setDropMenuOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [isFormData, setFormData] = useState({
    name: "",
    email: "",
    tel:"",
    message: "",
  })

  const [result, setResult] = useState("")

  const [showAlert, setShowAlert] = useState(false); 

  const [formInputAlerts, setformInputAlerts] = useState({
  name: "",
  email: "",
  tel: "",
  message: "",
  });

function validateField(field: string, value: string): string {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const telRegex = /^\+\d{6,15}$/;

  switch (field) {
    case "name":
      return value.trim() ? "" : "Name is required.";
    case "email":
      if (!value.trim()) return "Email is required.";
      if (!emailRegex.test(value)) return "Invalid email format.";
      return "";    
    case "tel":
      if (
        !value.trim() ||
        (selectedCountry?.callingCode &&
          value.trim() === `+${selectedCountry.callingCode}`)
      ) {
        return ""; // valid if it is empty or only prefix
      }
      return telRegex.test(value) ? "" : "Invalid phone format.";

      // Validate full number format
    case "message":
      return value.trim() ? "" : "Message is required.";
    default:
      return "";
  }
}

const form = useRef<HTMLFormElement>(null)


  function  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const fields = ["name", "email", "tel", "message"];

  const errors: Record<string, string> = {};
  fields.forEach((field) => {
    errors[field] = validateField(field, isFormData[field]);
  });

  setformInputAlerts(errors);

  const hasErrors = Object.values(errors).some((err) => err !== "");
  if (hasErrors) {
    return;
  }

   setformInputAlerts({
    name: "",
    email: "",
    tel: "",
    message: "",
  });

  console.log("Submitted", isFormData);


    emailjs
      .sendForm(serviceID, templateID, form.current, {
        publicKey: pKey,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  
    setResult("Form has been submitted with Input: " + JSON.stringify(isFormData))
    setFormData({
      name: "",
      email: "",
      tel: ``,
      message: "",
    })
    console.log("Result:", result);

    setTimeout(() => setResult(""), 4000)

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { id, value } = e.target;

  
  setFormData((prev) => ({ ...prev, [id]: value }));

  const error = validateField(id, value);

  setformInputAlerts((prev) => ({
    ...prev,
    [id]: error,
  }));
};


  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    setFormData({ ...isFormData, tel: `+${country.callingCode}` })
    setShowCountryDropdown(false)
  }

  return (
   <div className="min-h-screen text-lg flex flex-col gap-4 [@media(max-width:274px)]:text-xs text-muted-white bg-dark font-light font-poppins">
     


    <header className=" lg:px-[12.5rem] md:px-20 px-6 sticky top-0 z-10 border border-muted-white/10 bg-dark/85 backdrop-blur-sm">
    
      <nav className="py-6 flex flex-row justify-between items-start">
          
          {/* Left: Logo/Title */}
          
          <h1 className=" font-medium font-montserrat lg:text-xl sm:text-xl text-lg font-medium font-montserrat ">
              Despoina Vasiliki Liarokapi
          </h1>
          

          {/* Right: Navigation */}

          <nav className="md:flex md:flex-row hidden space-x-8 font-light font-poppins">
            <a href="#home" className="hover:underline decoration-muted-white">Home</a>
            <a href="#about" className="hover:underline decoration-muted-white">About</a>
            <a href="#experience" className="hover:underline decoration-muted-white">Experience</a>
            <a href="#contact" className=" hover:underline decoration-muted-white">Contact</a>
          </nav>

          {/* Mobile Menu hamburger Button */}
          <div className="md:hidden">
            <button onClick={() => setDropMenuOpen(!isDropMenuOpen)} className="px-2 no-focus-ring focus:outline-none focus:ring-0">
              <AiOutlineMenu size={24} className="scale-y-90"/>
            </button>
          </div>

      </nav>

      {/* Mobile Navigation Dropdown */}
      {isDropMenuOpen && (
            <nav className=" absolute top-full right-0 left-0 bg-dark/85 backdrop-blur-sm px-6 pb-13 text-right text-lg font-light font-poppins ">
              <ul className="space-y-2">
                <li>
                  <a className="hover:underline decoration-muted-white" href="#home" onClick={() => setDropMenuOpen(false)}>Home</a>
                </li>
                <li>
                  <a className="hover:underline decoration-muted-white" href="#about" onClick={() => setDropMenuOpen(false)}>About</a>
                </li>
                <li>
                  <a className="hover:underline decoration-muted-white" href="#experience" onClick={() => setDropMenuOpen(false)}>Experience</a>
                </li>
                <li>
                  <a className=" hover:underline decoration-muted-white" href="#contact" onClick={() => setDropMenuOpen(false)}>Contact</a>
                </li>
              </ul>
            </nav>
      )}
      
    </header>

    <main className="lg:px-[12.5rem] md:px-20 px-6 flex-1 flex flex-col gap-6">
        

        <section
          id="home"
          className="sm:min-h-screen my-12 sm:my-0 flex lg:flex-row flex-col lg:justify-between justify-center items-center lg:gap-0 gap-10 ">
            {/* Left: Hero */}

            <div className="lg:w-1/2 w-full p-6 text-center lg:space-y-7 space-y-8">

                <h1 className=" font-medium font-montserrat lg:text-6xl text-5xl [@media(max-width:274px)]:text-4xl text-5xl font-medium font-montserrat">
                  Creative Developer
                </h1>

                <p className=" sm:text-2xl text-xl leading-relaxed font-light font-poppins">
                  "To build tools as a programmer,
                  <br />
                  To use them as an artist."
                </p>

                <div className="flex sm:flex-row flex-col justify-center gap-4 mt-10">
                  <a
                    href="#contact"
                    className="px-8 py-4 bg-muted-white text-dark hover:bg-white font-medium font-montserrat ">
                    Get In Touch
                  </a>
                  <a
                    href="#about"
                    className="px-8 py-4 border border-muted-white text-muted-white hover:bg-muted-white/5 font-medium font-montserrat">
                    Learn More
                  </a>
                </div>
             
            </div>

            {/*Right: Visual */}

            <img
              src={Shapes}
              alt="shapes gif"
              className="lg:max-h-[410px] lg:w-1/2 max-h-[300px] object-contain"
            />
        </section>

      <section id="about" className="sm:py-8 py-4 ">

          <h1 className=" font-medium font-montserrat w-full mb-8 text-center md:text-4xl text-3xl ">About Me</h1>
           
          <div className="w-full lg:p-12 p-8 border border-muted-white/10 ">

            <img
              src={Profile}
              alt="Despoina Vasiliki Liarokapi"
              className="w-full float-none sm:float-left max-w-[250px] sm:mr-6 mx-auto  mb-8 sm:mb-0 object-contain"/>

            <div className="min-h-[250px] md:text-xl sm:text-base [@media(max-width:274px)]:text-sm leading-relaxed">
              <p className="mt-0 ">
                
                Hello, I am <strong className="font-bold font-montserrat">Despoina Vasiliki Liarokapi</strong>, a UX/UI designer & junior front-end
                developer based in Athens, GR.
                <br />
                I am a graduate of the Department of Informatics at the Athens University of Economics and Business, with a strong interest in technology and creative fields such as audiovisual design, marketing, and digital storytelling. 
                I’m passionate about blending technical expertise with artistic vision to contribute to projects that are both innovative and inspiring.
                My aim is to design experiences that not only function seamlessly but also leave a lasting impression on users.
                Alongside this, I'm involved in music creation, which enhances my creativity and sense of
                expression.
              </p>
            </div>
          
          </div>

        </section>

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
                2025 - Present
              </div>
              <p className="md:text-xl sm:text-base [@media(max-width:274px)]:text-sm ">
                <a href="https://acumino.ai/" className="hover:underline decoration-muted-white"> <strong className="font-bold font-montserrat uppercase">Acumino</strong></a>
                <strong className="font-bold font-montserrat"> : </strong>
                Served as a Junior UI/UX Designer and Front-End Developer Intern, rebuilding an internal GUI by migrating from a Python-based system (NiceGUI) to React, Vite, and Tailwind CSS to improve scalability, performance, and maintainability. Additionally, worked as a member of the team organizing the First 
                <a href="https://humanoidolympiad.org/" className="hover:underline decoration-muted-white">
                  <strong className="font-bold font-montserrat"> International Humanoid Olympiad 2025</strong>
                </a>
                .
              </p>
              <a href={`${import.meta.env.BASE_URL}CV.pdf`} download className=" w-fit px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-center flex flex-row items-center gap-1 text-sm sm:text-base bg-muted-white text-dark hover:text-dark/90 hover:bg-white font-medium font-montserrat">
                <IoMdDownload size={20} className="sm:size-6 lg:size-7 "/> Download my CV
              </a>
            </div>
          </div>

         <div className="">

          <JobCard
            icon={jobIcon2}
            date="2025 - present"
            companyLink="https://www.mourelatos.gr/"
            company="Mourelatos AE"
            description="Served as a Front-end Developer, responsible for updating and visually enhancing the official website using WordPress"
            buttonLink="https://www.mourelatos.gr/"
          />
          
          </div>


        </section>

        <section id="contact" className="sm:py-8 py-4">

         <div className="w-full text-center mb-24 ">
            <h1 className=" font-medium font-montserrat text-3xl md:text-4xl mb-4">Contact Me</h1>
            <h2 className="text-xl text-muted-white/90 font-medium font-montserrat">Feel free to drop me a line below.</h2>
          </div>

        <div className="w-full flex flex-row">

          {/*left:form*/}

          <form ref={form} onSubmit={handleSubmit} className="[@media(min-width:1527px)]:w-1/2 w-full space-y-6  font-poppins">

            <div className="relative mt-8">
            {/*name Alert */}
           
            <RequiredFieldPopUp className="font-medium font-montserrat "isVisible={!!formInputAlerts.name} message={formInputAlerts.name} position="top" />
        

              <input
                id="name"
                name="name"
                onChange={handleChange}
                value={isFormData.name}
                type="text"
                placeholder="Your Name (required)"
                className="w-full px-4 py-3 border border-muted-white/40  placeholder-muted-white/50 "
              />
            </div>

            
            <div className="relative">
              {/*email Alert*/}
             
            <RequiredFieldPopUp isVisible={!!formInputAlerts.email} message={formInputAlerts.email} position="top" />
         
              <input
                id="email"
                name="email"
                onChange={handleChange}
                value={isFormData.email}
                type="text"
                placeholder="Your Email (required)"
                className="w-full px-4 py-3 border border-muted-white/40  placeholder-muted-white/50"/>
            </div>

          
            <div className="relative flex border border-muted-white/40 focus-within:border-muted-white ">
                {/* phone number Alert*/}
                  
                  <RequiredFieldPopUp isVisible={!!formInputAlerts.tel} message={formInputAlerts.tel} position="top" />
              
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center gap-2 px-2 py-3">
                 <span className="">{selectedCountry?.flag || <span className="opacity-50"></span>}</span>

                  <ChevronDown className="w-4 h-4 opacity-50" />
                </button>

                <input
                  id="tel"
                  name="tel"
                  onChange={handleChange}
                  value={isFormData.tel}
                  type="tel"
                  placeholder={"Your number (optional)"}
            
                  className="w-full px-2 py-3 "
                />

                {/*Dropdown Tel Country menu */}
                 {showCountryDropdown && (
                <div className="absolute top-full left-0 right-0 w-full border border-muted-white/40 bg-dark mt-1 max-h-48 overflow-y-auto z-20">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="px-4 py-2.5 w-full flex flex-row items-center gap-2 hover:bg-muted-white/9 text-left  "
                    >
                      <span className="">{country.flag}</span>
                      <span className="flex-1 text-sm">{country.name}</span>
                      {selectedCountry?.code === country.code && <CheckIcon className="w-4 h-4" />}
                      <span className="text-sm opacity-50">+{country.callingCode}</span>
                      
                    </button>
                  ))}
                </div>
              )}

            </div>
            
            <div className="relative">
              {/* message alert*/}
                 
                    <RequiredFieldPopUp isVisible={!!formInputAlerts.message} message={formInputAlerts.message} position="top" />
                 
              <textarea
                id="message"
                name="message"
                onChange={handleChange}
                value={isFormData.message}
                placeholder="Your Message (required)"
                rows={5}
                className="w-full px-4 py-3 border border-muted-white/40 placeholder-muted-white/50"/>
            </div>

             

            <button
              type="submit"
              className="w-full sm:w-fit px-8 py-4 bg-muted-white text-dark hover:text-dark/90  hover:bg-white font-medium font-montserrat">
              Send Message
            </button>
 

            {/*submit success alert */}

            {result && (

            <Alert >
            <CheckCircle2Icon className="h-5 w-5" />
            <AlertTitle>Message sent.</AlertTitle>
            <AlertDescription>
              Thank you for contact me!
            </AlertDescription>
          </Alert>

            )}
              
          </form>

          {/*right:visual*/}              

          <img
            src={Shapes}
            alt="shapes gif"
            className="hidden [@media(min-width:1527px)]:w-1/2  lg:max-h-[420px]  object-contain  [@media(min-width:1527px)]:block"
          />


        </div>
        
        </section>
    </main>
    
    <footer className="lg:px-[12.5rem] md:px-20 p-6 flex flex-col md:flex-row items-center md:justify-between gap-4 border border-muted-white/10 font-light font-poppins">
        
      <p className=" text-center text-md sm:text-base">&copy; 2025 All rights reserved.</p>

      <div className="flex flex-row items-center gap-6">
        <a href="https://github.com/DespoinaLiarokapi" className="hover:text-white">
          <SiGithub className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
        <a href="https://www.linkedin.com/in/despoina-vasiliki-liarokapi" className="hover:text-white">
          <TiSocialLinkedinCircular className="w-7 h-7 sm:w-8 sm:h-8" />
        </a>
        <a href="mailto:despoinaliarokapi@gmail.com" className="hover:text-white">
          <MdAlternateEmail className="w-6 h-6 sm:w-7 sm:h-7" />
        </a>
        <a href="tel:+306970015984" className="hover:text-white">
          <FaPhoneAlt className="w-4 h-4 sm:w-6 sm:h-5" />
        </a>
      </div>

    </footer>

  </div>
  )
}