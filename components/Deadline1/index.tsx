import { useAppContext } from "@/context"
import Button from "../Button"
import TxPending from "../TxPending"
import HarvestSuccess from "../HarvestSuccess"
import LevelUpSuccess from "../LevelUpSuccess"
import TxFailed from "../TxFailed"
import constants from "@/utils/constants"

const Deadline1 = () => {
  const { gameStatus, actionStatus, txStatus, appData, changeStatus } = useAppContext()

  return (
    <>
      {actionStatus === constants.DISPLAY && (
        <div className="fadein w-[863px] px-[80px] pt-5 pb-7 rounded-[10px] text-center bg-[#127FBCE6]">
          <h2 className="mb-9 text-[40px] font-bold leading-[50px] uppercase">Level {appData.level} Completed</h2>
          <ul className="max-w-[540px] mx-auto mb-12 text-xl leading-[25px] font-semibold">
            <li className="flex justify-between">
              <h3>Deposit:</h3>
              <h4>{appData.deposit} PIT</h4>
            </li>
            <li className="flex justify-between">
              <h3>Level {appData.level} earnings*:</h3>
              <h4>{appData.earningOfLevel} PIT</h4>
            </li>
            {appData.level > 1 && (
              <li className="flex justify-between">
                <h3>Total game earnings*:</h3>
                <h4>{appData.earningOfGame} PIT</h4>
              </li>
            )}
            <p className="-mt-1 mb-3 text-left text-xs">*last update: today</p>
            <li className="flex justify-between">
              <h3>Farming advantage over new farmers</h3>
              <h4 className="text-[#9FFB98]">+{appData.advantage} %</h4>
            </li>
          </ul>
          <p className="text-shadow max-w-[577px] mx-auto mb-12 text-2xl leading-[30px] font-semibold text-[#D2FBE2]">
            You have <span className="underline">{appData.deadline1Days} days left</span> before you lose your level {appData.level} earnings{appData.level < 12 && " and your right to access the next level"}.
          </p>
          <div className={`flex ${appData.level < 12 ? "justify-between" : "justify-center"} `}>
            {appData.level < 12 && (
              <div className="max-w-[204px]">
                <p className="mb-4 leading-[20px] font-medium">
                  Leave the game and harvest your total earnings together with your deposit
                </p>
                <Button onClick={() => changeStatus(constants.harvest)}>Harvest</Button>
              </div>
            )}

            <div className="max-w-[204px]">
              {appData.level < 12 && (
                <p className="mb-4 leading-[20px] font-medium">
                  Proceed to level {appData.level + 1} and get additional <span className="text-[#9FFB98]">+4% advantage</span> over new farmers
                </p>
              )}
              <Button onClick={() => changeStatus(constants.level_up)}>Level Up</Button>
            </div>
          </div>
        </div>
      )}
      {actionStatus === constants.HARVEST && (
        <>
          {txStatus === constants.PENDING && <TxPending />}
          {txStatus === constants.SUCCESS && <HarvestSuccess />}
          {txStatus === constants.FAILED && <TxFailed />}
        </>
      )}
      {actionStatus === constants.LEVEL_UP && (
        <>
          {txStatus === constants.PENDING && <TxPending />}
          {txStatus === constants.SUCCESS && <LevelUpSuccess />}
          {txStatus === constants.FAILED && <TxFailed />}
        </>
      )}
    </>
  )
}

export default Deadline1
