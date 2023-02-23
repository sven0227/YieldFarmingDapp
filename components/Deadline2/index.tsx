import { useAppContext } from "@/context"
import Button from "../Button"
import TxPending from "../TxPending"
import HarvestSuccess from "../HarvestSuccess"
import TxFailed from "../TxFailed"
import constants from "@/utils/constants"

const Deadline2 = () => {
  const { gameStatus, actionStatus, txStatus, appData, changeStatus } = useAppContext()

  return (
    <>
      {actionStatus === constants.DISPLAY && (
        <div className="fadein w-[863px] px-[80px] pt-5 pb-7 rounded-[10px] text-center bg-[#127FBCE6]">
          <h2 className="mb-9 text-[40px] font-bold leading-[50px] uppercase">Level {appData.level} Completed</h2>
          <ul className="max-w-[540px] mx-auto mb-8 text-xl leading-[25px] font-semibold">
            <li className="flex justify-between">
              <h3>Deposit:</h3>
              <h4>{appData.deposit} PIT</h4>
            </li>
            <li className="flex justify-between text-[#D9D9D9E6]">
              <h3>Level {appData.level} earnings*:</h3>
              <h4>{appData.earningOfLevel} PIT</h4>
            </li>

            {appData.level === 2 && (
              <li className="flex justify-between">
                <h3>Level 1 earnings*:</h3>
                <h4>{appData.earningOfGame} PIT</h4>
              </li>
            )}
            {appData.level >= 3 && (
              <li className="flex justify-between">
                <h3>Level 1-{appData.level - 1} earnings*:</h3>
                <h4>{appData.earningOfGame} PIT</h4>
              </li>
            )}
            <p className="-mt-1 text-left text-xs text-[#D9D9D9E6]">*last update: today</p>
          </ul>

          {appData.level === 1 && (
            <>
              <p className="max-w-[546px] mx-auto mb-6 text-xl font-medium leading-6 text-[#D9D9D9E6]">
                You missed the 15-day deadline for paying out your level earnings.
              </p>
              <p className="text-shadow max-w-[577px] mx-auto mb-10 text-2xl leading-[30px] font-semibold text-[#D2FBE2]">
                Harvest within the next 7 days to pay out your deposit.
              </p>
            </>
          )}
          {appData.level === 2 && (
            <>
              <p className="max-w-[546px] mx-auto mb-6 text-xl font-medium leading-6 text-[#D9D9D9E6]">
                You missed the 15-day deadline for paying out your level 2 earnings.
              </p>
              <p className="text-shadow max-w-[577px] mx-auto mb-10 text-2xl leading-[30px] font-semibold text-[#D2FBE2]">
                Harvest within the next 7 days to pay out your earnings from levels 1 and your deposit.
              </p>
            </>
          )}
          {appData.level === 3 && (
            <>
              <p className="max-w-[546px] mx-auto mb-6 text-xl font-medium leading-6 text-[#D9D9D9E6]">
                You missed the 15-day deadline, your level {appData.level + 1} earnings are burned.
              </p>
              <p className="text-shadow max-w-[577px] mx-auto mb-10 text-2xl leading-[30px] font-semibold text-[#D2FBE2]">
                Harvest within the next 7 days to pay out your earnings from levels 1 and 2 and your deposit.
              </p>
            </>
          )}
          {appData.level >= 4 && (
            <>
              <p className="max-w-[546px] mx-auto mb-6 text-xl font-medium leading-6 text-[#D9D9D9E6]">
                You missed the 15-day deadline, your level {appData.level} earnings are burned.
              </p>
              <p className="text-shadow max-w-[577px] mx-auto mb-10 text-2xl leading-[30px] font-semibold text-[#D2FBE2]">
                Harvest within the next 7 days to pay out your earnings from levels 1 - {appData.level - 1} and your deposit.
              </p>
            </>
          )}

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
                  You missed your chance to levelup.
                </p>
              )}
              <Button disabled>Level Up</Button>
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
    </>
  )
}

export default Deadline2
