import type React from "react"
import { Alert, AlertTitle, AlertDescription } from "./ui/alert"
import { CheckCircle2Icon } from "lucide-react"
import RequiredFieldPopUp from "./RequiredFieldPopUp"
import { CheckIcon, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import emailjs from "@emailjs/browser"
import { validateField } from "../utils/fieldFormValidation"
import Shapes from "../assets/shapes.gif"

type Country = {
  code: string
  name: string
  callingCode: string
  flag: string
}

const countries: Country[] = [
  { code: "GR", name: "Greece", callingCode: "30", flag: "🇬🇷" },
  { code: "US", name: "United States", callingCode: "1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", callingCode: "44", flag: "🇬🇧" },
  { code: "DE", name: "Germany", callingCode: "49", flag: "🇩🇪" },
  { code: "FR", name: "France", callingCode: "33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", callingCode: "39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", callingCode: "34", flag: "🇪🇸" },
  { code: "CA", name: "Canada", callingCode: "1", flag: "🇨🇦" },
]

type FormValues = {
  name: string
  email: string
  tel: string
  message: string
}

type formAlertsValues = {
  name: string
  email: string
  tel: string
  message: string
}

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null)
  const debounceTimer = useRef<number | null>(null)

   //env
  const pKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID  
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID

  // state
  type SelectedCountryState = Country | null
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountryState>(null)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [isFormData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
    tel: "",
    message: "",
  })
  const [formAlerts, setFormAlerts] = useState<formAlertsValues>({
    name: "",
    email: "",
    tel: "",
    message: "",
  })

  const [result, setResult] = useState("")

  // functions

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setFormData({ ...isFormData, tel: `+${country.callingCode}` })
    setShowCountryDropdown(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target

    setFormData((prev) => ({ ...prev, [id]: value }))

    // while user is typing erase prev alerts.
    setFormAlerts((prev) => ({
      ...prev,
      [id]: "",
    }))

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    const newTimer = window.setTimeout(() => {
      if (["name", "email", "tel"].includes(id)) {
        const msg = validateField(id as keyof FormValues, value)
        if (msg) {
          setFormAlerts((prev) => ({ ...prev, [id]: msg }))
        }
      }
    }, 800) // 800ms delay for better UX

    debounceTimer.current = newTimer
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nameError = validateField("name", isFormData.name)
    const emailError = validateField("email", isFormData.email)
    const messageError = validateField("message", isFormData.message)

    if (nameError || emailError || messageError) {
      setFormAlerts({
        name: nameError || "",
        email: emailError || "",
        tel: "",
        message: messageError || "",
      })
      return
    }

    if (form.current && serviceID && templateID && pKey) {
      
      emailjs
        .sendForm(serviceID, templateID, form.current, {
          publicKey: pKey,
        })
        .then(
          () => {
            console.log("Submission SUCCEED!")
            setResult("Form has been submitted and email sent successfully!")
            setFormData({
              name: "",
              email: "",
              tel: "",
              message: "",
            })
            setFormAlerts({
              name: "",
              email: "",
              tel: "",
              message: "",
            })
          },
          (error) => {
            console.log("Submission FAILED...", error.text)
          },
        )
    } 

    setTimeout(() => setResult(""), 4000)
  }

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])


  return (
    <section id="contact" className="sm:py-8 py-4">
      <div className="w-full text-center mb-24 ">
        <h1 className=" font-medium font-montserrat text-3xl md:text-4xl mb-4">Contact Me</h1>
        <h2 className="text-xl text-muted-white/90 font-medium font-montserrat">Feel free to drop me a line below.</h2>
      </div>

      <div className="w-full flex flex-row">
        {/*left:form*/}

        <form
          ref={form}
          onSubmit={handleSubmit}
          className="[@media(min-width:1527px)]:w-1/2 w-full space-y-6  font-poppins"
        >


          {/*name Alert */}
          <div className="relative mt-8 font-medium font-montserrat">
            <RequiredFieldPopUp
              isVisible={Boolean(formAlerts.name)}
              message={formAlerts.name}
              position="top"
            />

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

          {/*email Alert*/}
          <div className="relative">
            <RequiredFieldPopUp isVisible={Boolean(formAlerts.email)} message={formAlerts.email} position="top" />

            <input
              id="email"
              name="email"
              onChange={handleChange}
              value={isFormData.email}
              type="text"
              placeholder="Your Email (required)"
              className="w-full px-4 py-3 border border-muted-white/40  placeholder-muted-white/50"
            />
          </div>

           {/* phone number Alert*/}  
            <div className="relative flex border border-muted-white/40 focus-within:border-muted-white ">
          
            <RequiredFieldPopUp isVisible={Boolean(formAlerts.tel)} message={formAlerts.tel} position="top" />

             <button
              type="button"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="flex items-center w-16 pl-3 pr-2 py-3 gap-3 "
            >
              <div className="w-4 flex justify-center ">{selectedCountry && <span>{selectedCountry.flag}</span>}</div>
              <ChevronDown
                className={`w-4 h-4 opacity-50 transition-transform duration-200 ${
                  showCountryDropdown ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <input
              id="tel"
              name="tel"
              onChange={handleChange}
              value={isFormData.tel}
              type="tel"
              placeholder="Your number (optional)"
              className="w-full pr-2 py-3 focus:outline-none"
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

          {/* message alert*/}
          <div className="relative">
            
            <RequiredFieldPopUp isVisible={Boolean(formAlerts.message)} message={formAlerts.message} position="top" />

            <textarea
              id="message"
              name="message"
              onChange={handleChange}
              value={isFormData.message}
              placeholder="Your Message (required)"
              rows={5}
              className="w-full px-4 py-3 border border-muted-white/40 placeholder-muted-white/50"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-fit px-8 py-4 bg-muted-white text-dark hover:text-dark/90  hover:bg-white font-medium font-montserrat">
            Send Message
          </button>

          {/*submit success alert */}

          {result && (
            <Alert>
              <CheckCircle2Icon className="h-5 w-5" />
              <AlertTitle>Message sent.</AlertTitle>
              <AlertDescription>{result}</AlertDescription>
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
  )
}
