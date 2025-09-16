import Header from "./components/Header"
import Hero from "./components/  Hero"
import About from "./components/About"
import Experience from "./components/Experience"
import ContactForm from "./components/ContactForm"
import Footer from "./components/Footer"


export default function App() {
  return (

   <div className="min-h-screen text-lg flex flex-col gap-4 [@media(max-width:274px)]:text-xs text-muted-white bg-dark font-light font-poppins">
     
    <Header/>
  
    <main className="lg:px-[12.5rem] md:px-20 px-6 flex-1 flex flex-col gap-6">
        
      <Hero/>

      <About/>

      <Experience/>

      <ContactForm/>


    </main>

    <Footer/>
    
  </div>

  )
}