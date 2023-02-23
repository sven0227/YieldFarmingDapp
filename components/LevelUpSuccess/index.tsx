import Image from "next/image"
import WhiteButton from "../WhiteButton"
import { useAppContext } from "@/context"
import constants from "@/utils/constants"

const LevelUpSuccess = () => {
  const { gameStatus, actionStatus, txStatus, appData, changeStatus } = useAppContext()

  return (
    <div className="fadein w-[600px] p-[26px] rounded-[10px] text-center bg-[#3E9C37E6]">
      <h3 className="mb-9 text-2xl font-bold">
        Congratulations!<br />
        You successfully progressed to level {appData.level}!
      </h3>
      <h4 className="mb-2.5 font-medium">Transaction hash:</h4>
      <p className="flex items-center gap-3 mb-8">
        <span className="text-sm font-medium">{appData.txHash}</span>
        <a href={`https://mumbai.polygonscan.com/tx/${appData.txHash}`} target="_blank" rel="noreferrer">
          <Image src="/images/open-link.svg" width={15} height={15} alt="open link" />
        </a>
      </p>
      <ul className="max-w-[411px] flex flex-col gap-6 mx-auto mb-9">
        <li className="flex justify-between text-xl">
          <h4 className="font-medium">Your level 1 earnings</h4>
          <p className="font-bold">{appData.earningOfLevel} PIT</p>
        </li>
      </ul>
      <WhiteButton onClick={() => changeStatus(constants.okay, constants.success)}>OK</WhiteButton>
    </div>
  )
}

export default LevelUpSuccess
