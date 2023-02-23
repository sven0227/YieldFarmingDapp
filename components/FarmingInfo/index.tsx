import { useState } from "react"
import Image from "next/image"
import { useAppContext } from "@/context"

const FarmingInfo = () => {
  const [expand, setExpand] = useState<boolean>(false)
  const { gameStatus, actionStatus, txStatus, appData, changeStatus } = useAppContext()

  return (
    <div className={`absolute top-0 left-0 ${expand ? "w-[574px] py-12" : "w-[220px] py-[22px]"} px-8 bg-[#127FBCE6] duration-300`}>
      <ul className={`flex flex-col ${expand ? "pb-6 text-xl gap-10" : "pb-3 gap-[26px]"} leading-none truncate duration-300`}>
        <li className="flex justify-between">
          {expand && <h2>Deposit</h2>}
          <h3 className="text-[#9FFB98]">{appData.deposit} PIT</h3>
        </li>
        <div className="flex flex-col gap-5">
          <li className="flex justify-between">
            {expand && (
              <div>
                <h2>Farming earnings current of level</h2>
                <p className="text-base">(last update: yesterday)</p>
              </div>
            )}
            <h3 className="text-[#F2E144]">{appData.earningOfLevel} PIT</h3>
          </li>
          <li className="flex justify-between">
            {expand && (
              <div>
                <h2>Farming earnings of current game</h2>
                <p className="text-base">(last update: yesterday)</p>
              </div>
            )}
            <h3 className="text-[#F2E144]">{appData.earningOfGame} PIT</h3>
          </li>
          <li className="flex justify-between">
            {expand && <h2>Level No</h2>}
            <h3 className="text-[#F2E144]">{appData.level}/12</h3>
          </li>
        </div>
        <li className="flex justify-between">
          {expand && <h2>Remaining days to level completion</h2>}
          <h3 className="flex gap-1 text-[#F2E144]">
            {appData.remainingDays} days
            {!expand && (
              <div className="font-bold">
                <span className="dot-1">.</span>
                <span className="dot-2">.</span>
                <span className="dot-3">.</span>
                <span className="dot-4">.</span>
                <span className="dot-5">.</span>
              </div>
            )}
          </h3>
        </li>
        <li className="flex justify-between">
          {expand && <h2>My farming difficulty</h2>}
          <h3 className="text-[#F2E144]">{appData.difficultyOfGame}</h3>
        </li>
        <li className="flex justify-between">
          {expand && <h2>Farming advantage over new farmers</h2>}
          <h3 className="text-[#9FFB98]">{appData.advantage} %</h3>
        </li>
      </ul>
      <button className="absolute bottom-0 right-0" onClick={() => setExpand(!expand)}>
        <Image src="/images/expand.svg" width={50} height={50} alt="expand" />
      </button>
    </div>
  )
}

export default FarmingInfo
