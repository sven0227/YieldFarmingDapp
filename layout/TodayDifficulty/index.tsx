import { useAppContext } from "@/context"
import constants from "@/utils/constants"

const TodayDifficulty = () => {
  const { gameStatus, actionStatus, txStatus, appData, changeStatus } = useAppContext()

  return (
    <>
      {gameStatus !== constants.DISCONNECTED && gameStatus !== constants.CONNECTING && gameStatus !== constants.CUTSCENE_1 && (
        <p className="absolute top-2 right-3 flex items-center justify-center w-[265px] h-[33px] text-sm font-bold text-[#515151] bg-[#D9D9D9E6]">
          Today’s farming difficulty: {appData.difficultyOfToday}
        </p>
      )}
    </>
  )
}

export default TodayDifficulty
