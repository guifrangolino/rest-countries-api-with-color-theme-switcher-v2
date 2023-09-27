import { Moon } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "./theme-provider"


export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="w-full shadow-strong-thin mb-8 bg-primary">
      <div className="w-full max-w-[1440px] m-auto flex items-center justify-between px-3 py-4">
        <h1 className="font-bold text-xl mobile-break:text-base">Where in the world?</h1>
        <Button variant="ghost" className="font-bold mobile-break:text-xs" onClick={() => theme === "light" ? setTheme("dark") : setTheme("light")}>
          <Moon className={`w-5 h-5 mr-2 ${theme === 'dark' && 'fill-foreground text-transparent'} mobile-break:w-4 mobile-break:h-4 mobile-break:mr-1`} />
          Dark mode
        </Button>
      </div>
    </header>
  )
}