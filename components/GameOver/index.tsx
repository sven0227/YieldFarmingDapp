import { useAppContext } from "@/context"
import Button from "../Button"
import TxPending from "../TxPending"
import TxSuccess from "../TxSuccess"
import TxFailed from "../TxFailed"
import constants from "@/utils/constants"

const GameOver = () => {
  const { gameStatus, actionStatus, txStatus, appData, changeStatus } = useAppContext()

  return (
    <>
      {actionStatus === constants.DISPLAY && (
        <div className="fadein w-[863px] px-[80px] pt-5 pb-7 rounded-[10px] text-center bg-[#127FBCE6]">
          <h2 className="mb-9 text-[40px] font-bold leading-[50px] uppercase">Game Over</h2>
          <ul className="max-w-[540px] mx-auto mb-12 text-xl leading-[25px] font-semibold text-[#D9D9D9E6]">
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
              <h4>+{appData.advantage} %</h4>
            </li>
          </ul>
          <p className="text-shadow max-w-[577px] mx-auto mb-5 text-2xl leading-[30px] font-semibold text-[#D2FBE2]">
            You missed the 30-day deadline after level completion.</p>
          <p className="text-shadow max-w-[577px] mx-auto mb-16 text-2xl leading-[30px] font-semibold text-[#D2FBE2]">
            Your deposit and your earnings are burned.
          </p>
          <Button onClick={() => changeStatus(constants.remove)}>Remove Farm</Button>
        </div>
      )}
      {actionStatus === constants.REMOVE && (
        <>
          {txStatus === constants.PENDING && <TxPending />}
          {txStatus === constants.SUCCESS && <TxSuccess />}
          {txStatus === constants.FAILED && <TxFailed />}
        </>
      )}
    </>
  )
}

export default GameOver
