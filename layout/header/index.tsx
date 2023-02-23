import Link from "next/link"
import Image from "next/image"
import { Overpass_Mono } from "@next/font/google"
import { useAppContext } from "@/context"
import { getShortAddress, bigintToString4 } from "@/utils"
import constants from "@/utils/constants"

const overpassMono = Overpass_Mono({ subsets: ["latin"] })

const Header = () => {
  const { gameStatus, actionStatus, txStatus, appData, changeStatus, wallet } = useAppContext()

  return (
    <>
      {gameStatus !== constants.CUTSCENE_1 && (
        <header className={`fadein flex items-center h-[78px] px-8 ${gameStatus === constants.DISCONNECTED || gameStatus === constants.CONNECTING ? "bg-[#515151CC]" : "bg-[#127FBCCC]"} duration-1000`}>
          <Link href="/">
            <Image className="w-[204px] h-auto" src="/images/logo.svg" width={204} height={47} alt="logo" />
          </Link>

          <div className="ml-auto">
            <div className={`flex justify-end gap-[146px] ${overpassMono.className} text-sm font-bold leading-[18px]`}>
              <Link href="/buy-sell" className="hover-underline">
                <span>buy/sell PIT</span>
              </Link>
              <Link href="/tutorial" className="hover-underline">
                <span>tutorial</span>
              </Link>
              {gameStatus === constants.DISCONNECTED ? (
                <button className="hover-underline flex gap-1.5 text-[#4CB8DA]" onClick={() => changeStatus(constants.connect)}>
                  <span className="blue">connect</span>
                  <Image className="w-4 h-auto" src="/images/connect.svg" width={16} height={16} alt="connect" />
                </button>
              ) : (
                <>
                  {gameStatus === constants.CONNECTING ? (
                    <button className="flex gap-1.5" >
                      <span className="text-[#F2E144]">Loading</span>
                      <Image className="rotate w-4 h-auto" src="/images/loading.svg" width={155} height={150} alt="loading" />
                    </button>
                  ) : (
                    <button className="hover-underline flex gap-1.5 text-[#9FFB98]" onClick={() => changeStatus(constants.disconnect)}>
                      <span className="green">disconnect</span>
                      <Image className="w-3.5 h-auto" src="/images/disconnect.svg" width={14} height={16} alt="disconnect" />
                    </button>

                  )}
                </>
              )}
            </div>
            {gameStatus !== constants.DISCONNECTED && gameStatus !== constants.CONNECTING && (
              <div className="flex justify-end gap-[120px] mt-2 text-sm leading-[18px] text-[#F2E144]">
                <div className="flex items-center gap-2">
                  <span>Account: {getShortAddress(wallet)}</span>
                  <button onClick={() => navigator.clipboard.writeText(wallet)}>
                    <Image className="w-2.5 h-auto -mt-px" src="/images/clipboard.svg" width={11} height={15} alt="clipboard"
                    />
                  </button>
                </div>
                <span className={`${gameStatus === constants.NEW_GAME && actionStatus === constants.BLINK ? "blink" : ""} font-bold`}>Balance: {appData.balance} PIT</span>
              </div>
            )}
          </div>
        </header>
      )}
    </>
  )
}

export default Header
