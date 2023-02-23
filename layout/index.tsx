import { useEffect, useState } from "react"
import Header from "./header"
import TodayDifficulty from "./TodayDifficulty"
import { useAppContext } from "@/context"
import constants from "@/utils/constants"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [maxWidth, setMaxWidth] = useState<number>()
  const { gameStatus, actionStatus, txStatus, appData, changeStatus } = useAppContext()

  const changeMaxWidth = () => {
    setMaxWidth(window.innerHeight * 16 / 9)
  }

  // Change max-width on resize
  useEffect(() => {
    window.addEventListener('resize', changeMaxWidth)
    return () => {
      window.removeEventListener('resize', changeMaxWidth)
    }
  })

  // Set max-width on mount
  useEffect(() => {
    changeMaxWidth()
  }, [])

  return (
    <div className={gameStatus === constants.DISCONNECTED || gameStatus === constants.CONNECTING ? "bg-[#515151]" : "bg-[#127FBC]"}>
      <div
        className={`min-h-screen flex flex-col mx-auto bg-bottom bg-no-repeat bg-cover duration-1000
          ${gameStatus === constants.DISCONNECTED || gameStatus === constants.CONNECTING ? "mono-bg" : (
            gameStatus !== constants.CUTSCENE_1 && (
              gameStatus === constants.NEW_GAME ? "color-new-bg" : "color-crowd-bg"
            )
          )}`}
        style={{ maxWidth }}
      >
        <Header />
        <div className="relative flex-grow flex items-center justify-center">
          <TodayDifficulty />
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
