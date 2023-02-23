import { useState, useEffect } from "react"
import Image from "next/image"
import Button from "../Button"
import TxPending from "../TxPending"
import TxSuccess from "../TxSuccess"
import TxFailed from "../TxFailed"
import { useAppContext } from "@/context"
import constants from "@/utils/constants"
import { getEstEarning } from "@/utils"

const NewGame = () => {
  const [deposit, setDeposit] = useState<string>("1")
  const { gameStatus, actionStatus, txStatus, appData, changeStatus, appDataTemp } = useAppContext()
  const [estimatedEarning, setEstimatedEarning] = useState<string>("1")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const RegExp = /^\d*\.?\d*$/
    if (e.target.value === "" || RegExp.test(e.target.value)) {
      if (Number(e.target.value) < 1 || e.target.value === ".") {
        setDeposit("1")
        return
      }
      if (e.target.value.split(".")[1]?.length > 8) {
        return
      }
      setDeposit(e.target.value)
      setEstimatedEarning(getEstEarning(e.target.value, appData))
    }
  }

  const handleStart = () => {
    if (Number(deposit) * 1e8 > appDataTemp.balance) {
      setTimeout(() => {
        setDeposit(appData.balance)
      }, 2000);
    }
    if (appData.balance < 1) {
      return
    }
    changeStatus(constants.start, deposit)
  }

  useEffect(() => {
    setEstimatedEarning(getEstEarning(deposit, appData))
  }, [appData.currentDay])

  return (
    <>
      {(actionStatus === constants.DISPLAY || actionStatus === constants.BLINK) && (
        <div className="fadein w-[863px] px-[45px] py-[27px] rounded-[10px] text-center bg-[#127FBCE6]">
          <h2 className="mb-[62px] text-[40px] font-bold leading-[50px] uppercase">New Game</h2>
          <div className="flex justify-between mb-8">
            {/* Enter your deposit (PIT) */}
            <div className="flex flex-col items-center gap-[13px]">
              <h3 className="text-xl leading-[25px]">Enter your<br /> deposit (PIT)</h3>
              <input
                className={`${actionStatus === constants.BLINK ? "blink" : ""} w-[250px] h-[50px] px-[25px] border border-[#DAC94C] rounded text-right text-xl font-bold text-black`}
                id="deposit"
                name="deposit"
                autoComplete="off"
                value={deposit}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-[13px]">Min. amount 1 PIT</p>
            </div>

            <div className="flex flex-col items-center gap-3 pt-7 text-[#DAC94C]">
              <h3 className="text-xl font-bold">1st level</h3>
              <Image src="/images/arrow.svg" width={139} height={36} alt="arrow" />
              <p className="text-xl leading-[25px]">30 days<br /> runtime</p>
            </div>

            {/* Estimated earnings (PIT) */}
            <div className="flex flex-col items-center gap-[13px]">
              <h3 className="text-xl leading-[25px]">Estimated<br /> earnings (PIT)</h3>
              <input
                className="w-[250px] h-[50px] px-[25px] border border-[#DAC94C] rounded text-right text-xl font-bold bg-[#DAC94C9E]"
                id="estimatedEarning"
                name="estimatedEarning"
                value={estimatedEarning}
                readOnly
              />
            </div>
          </div>
          <Button onClick={handleStart}>Start Farming</Button>
        </div>
      )}
      {actionStatus === constants.START && (
        <>
          {txStatus === constants.PENDING && <TxPending />}
          {txStatus === constants.SUCCESS && <TxSuccess />}
          {txStatus === constants.FAILED && <TxFailed />}
        </>
      )}
    </>
  )
}

export default NewGame
