export default function JobCard({ icon, company, companyLink, date, description, buttonLink, buttonText = "More" }) {
  return (
    <div className="w-full lg:p-12 p-8 border border-muted-white/10 ">
      <img
        src={icon}
        alt="jobIcon"
        className="w-full float-none sm:float-left max-w-[250px] sm:mr-6 mx-auto  mb-8 sm:mb-0 object-contain"
      />

      <div className="min-h-[250px] flex flex-col lg:justify-end gap-4">
        <div className="inline-block w-fit px-4 py-2 bg-muted-white/10 text-sm font-bold font-montserrat">{date}</div>

        <p className="md:text-xl sm:text-base [@media(max-width:274px)]:text-sm leading-relaxed font-poppins font-light">
          <a href={companyLink}><strong className="font-bold font-montserrat uppercase hover:text-gray" >{company} : </strong></a>
          
           {description}.
        </p>

        <a
            href={buttonLink}
            className="w-fit px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-center flex flex-row items-center gap-1 text-sm sm:text-base bg-muted-white text-dark hover:text-dark/90 hover:bg-white font-medium font-montserrat">
            {buttonText}
        </a>
    
      </div>
    </div>
  );
}
