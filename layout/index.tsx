import { useState, useEffect } from "react"
import Header from "./header"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [wide, setWide] = useState<boolean>(false)

  const checkWideScreen = () => {
    if (window.innerWidth / window.innerHeight > 16 / 9) {
      setWide(true)
    } else {
      setWide(false)
    }
  }

  // Check if screen ratio is bigger than 16:9 on resize
  useEffect(() => {
    window.addEventListener('resize', checkWideScreen)
    return () => {
      window.removeEventListener('resize', checkWideScreen)
    }
  })

  // Check if screen ratio is bigger than 16:9 on mount
  useEffect(() => {
    checkWideScreen()
  }, [])

  return (
    <>
      <Header />
      {children}
      {/* Background Image */}
      <div className={`absolute z-[-1] top-0 left-0 w-full h-full bg-[#515151] bg-[url('/images/NY_Monochrome_BG_xl.jpg')] lg:bg-[url('/images/NY_Monochrome_BG_2k.jpg')] 2k:bg-[url('/images/NY_Monochrome_BG_4k.jpg')] 4k:bg-[url('/images/NY_Monochrome_BG_8k.jpg')] bg-bottom bg-no-repeat ${wide ? "bg-contain" : "bg-cover"}`} />
    </>
  )
}

export default Layout
