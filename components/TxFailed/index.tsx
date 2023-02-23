import WhiteButton from "../WhiteButton"
import { useAppContext } from "@/context"
import constants from "@/utils/constants"

const TxFailed = () => {
  const { gameStatus, actionStatus, txStatus, appData, changeStatus } = useAppContext()

  return (
    <div className="flex flex-col items-center w-[438px] h-[206px] pt-9 pb-[26px] rounded-[10px] text-center bg-[#515151]">
      <h3 className="mb-3 text-2xl font-bold">Transaction failed!</h3>
      <h4 className="mb-auto text-xl font-medium">Please try again</h4>
      <WhiteButton onClick={() => changeStatus(constants.okay, constants.failed)}>OK</WhiteButton>
    </div>
  )
}

export default TxFailed
