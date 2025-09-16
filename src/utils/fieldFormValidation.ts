export function validateField(field: string, value: string, selectedCountry?: { callingCode: string }): string 

{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const telRegexFull = /^\+\d{6,15}$/
  const lettersOnly = /^[\p{L}\s'-]+$/u

  const v = value.trim();
  const prefix = selectedCountry?.callingCode ? `+${selectedCountry.callingCode}` : ""

  switch (field) {
    case "name":
      if (!lettersOnly.test(v) && v) return "Only letters allowed."
      if (!v) return "Name is required."
      return ""

    case "email":
      if (v && !emailRegex.test(v)) return "Invalid email format."
      if (!v) return "Email is required."
      return ""

    case "tel":
      if (!prefix && !v) return ""
      if (prefix && !v) return ""
      if (telRegexFull.test(v)) return ""
      if (prefix && telRegexFull.test(prefix + v)) return ""
      return "Invalid phone format."

    case "message":
      if (!v) return "Message is required."
      return ""

    default:
      return ""
  }
}