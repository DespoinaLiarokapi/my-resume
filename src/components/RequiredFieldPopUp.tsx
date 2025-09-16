import { RiAlertFill } from "react-icons/ri"

interface RequiredFieldPopUpProps {
  message?: string
  isVisible: boolean
  position?: "top" | "bottom" | "left" | "right"
}

export default function RequiredFieldPopUp({
  message,
  isVisible=true,
  position = "top",
}: RequiredFieldPopUpProps) {
  if (!isVisible) return null

  

       
  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full "

      case "left":
        return "right-full  "

      case "right":

        return "left-full  "
      default:
        return "top-full "
    }
  }

  return ( 
    <div className={`absolute z-50 ${getPositionClasses()}`}>
  <div className="px-3 py-1 text-xs text-dark font-bold bg-muted-white/85">
    <span className="flex flex-row items-center gap-2">
      <RiAlertFill size={25} />
      {message}
    </span>
  </div>
</div>

  )
}
