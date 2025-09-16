
import { AiOutlineMenu } from "react-icons/ai"
import { useState, useRef } from "react"

export default function Header() {
  
     
  const [isDropMenuOpen, setDropMenuOpen] = useState(false)
  
  return(


  <header className=" lg:px-[12.5rem] md:px-20 px-6 sticky top-0 z-10 border border-muted-white/10 bg-dark/85 backdrop-blur-sm">
    
      <nav className="py-6 flex flex-row justify-between items-start">
          
          {/* Left: Logo/Title */}
          
          <h1 className=" font-medium font-montserrat lg:text-xl sm:text-xl text-lg font-medium font-montserrat ">
              Despoina Vasiliki Liarokapi
          </h1>
          

          {/* Right: Navigation */}

          <nav className="md:flex md:flex-row hidden space-x-8 font-light font-poppins">
            <a href="#home" className="hover:underline underline-offset-2 decoration-muted-white">Home</a>
            <a href="#about" className="hover:underline underline-offset-2 decoration-muted-white">About</a>
            <a href="#experience" className="hover:underline underline-offset-2 decoration-muted-white">Experience</a>
            <a href="#contact" className=" hover:underline underline-offset-2 decoration-muted-white">Contact</a>
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
                  <a className="hover:underline underline-offset-2 decoration-muted-white" href="#home" onClick={() => setDropMenuOpen(false)}>Home</a>
                </li>
                <li>
                  <a className="hover:underline underline-offset-2 decoration-muted-white" href="#about" onClick={() => setDropMenuOpen(false)}>About</a>
                </li>
                <li>
                  <a className="hover:underline underline-offset-2 decoration-muted-white" href="#experience" onClick={() => setDropMenuOpen(false)}>Experience</a>
                </li>
                <li>
                  <a className=" hover:underline underline-offset-2 decoration-muted-white" href="#contact" onClick={() => setDropMenuOpen(false)}>Contact</a>
                </li>
              </ul>
            </nav>
      )}
      
  </header>




);

}