import Shapes from "../assets/shapes.gif"


export default function Hero() {
  return (
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
        );
}