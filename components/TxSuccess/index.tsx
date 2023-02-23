import Image from "next/image"
import WhiteButton from "../WhiteButton"
import { useAppContext } from "@/context"
import constants from "@/utils/constants"

const TxSuccess = () => {
  const { gameStatus, actionStatus, txStatus, appData, changeStatus } = useAppContext()

  return (
    <div className="fadein flex flex-col items-center w-[600px] h-[240px] p-5 rounded-[10px] text-center bg-[#3E9C37E6]">
      <h3 className="mb-7 text-2xl font-bold">Transaction successful</h3>
      <h4 className="mb-2.5 font-medium">Transaction hash:</h4>
      <p className="flex items-center gap-3 mb-auto">
        <span className="text-sm font-medium">{appData.txHash}</span>
        <a href={`https://mumbai.polygonscan.com/tx/${appData.txHash}`} target="_blank" rel="noreferrer">
          <Image src="/images/open-link.svg" width={15} height={15} alt="open link" />
        </a>
      </p>
      <WhiteButton onClick={() => changeStatus(constants.okay, constants.success)}>OK</WhiteButton>
    </div>
  )
}

export default TxSuccess
