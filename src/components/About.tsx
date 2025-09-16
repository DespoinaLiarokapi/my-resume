import Profile from "../assets/images/profile0.png"

export default function About(){
    return(
         <section id="about" className="sm:py-8 py-4">

          <h1 className=" font-medium font-montserrat w-full mb-8 text-center md:text-4xl text-3xl ">About Me</h1>
           
          <div className="w-full lg:p-12 p-8 border border-muted-white/10 ">

            <img
              src={Profile}
              alt="Despoina Vasiliki Liarokapi"
              className="w-full float-none sm:float-left max-w-[250px] sm:mr-6 mx-auto  mb-8 sm:mb-0 object-contain"/>

            <div className="min-h-[250px] md:text-xl sm:text-base [@media(max-width:274px)]:text-sm leading-relaxed">
              <p className="mt-0 ">
                <br />
                
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
    );
}


