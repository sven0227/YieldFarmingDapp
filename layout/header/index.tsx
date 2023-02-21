import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Oxanium } from "@next/font/google"
import { useAppContext } from "@/context";

const oxanium = Oxanium({ subsets: ["latin"] })

const Header = () => {

  const { connected, connecting, connect, disconnect, setAccounts, accounts, contract } = useAppContext();
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    const balanceOf = await contract.balanceOf(accounts[0]);
    setBalance(balanceOf);
    console.log("BALANCE_OF :>> ", balanceOf);
  }

  useEffect(() => {

    if (accounts[0]) getBalance();

  }, [accounts]);

  return (
    <header className="flex items-center h-[78px] px-8 bg-[#515151CC]">
      <Link href="/">
        <Image className="w-[204px] h-auto" src="/images/logo.svg" width={204} height={47} alt="logo" />
      </Link>

      <div className="ml-auto">
        <div className="flex justify-end gap-[146px] text-sm font-bold leading-[18px]">
          <Link href="/buy-sell" className="hover-underline">
            <span>buy/sell PIT</span>
          </Link>
          <Link href="/tutorial" className="hover-underline">
            <span>tutorial</span>
          </Link>
          {connecting ? (
            <button className="flex gap-1.5" >
              <span className="text-[#F2E144]">Loading</span>
              <Image className="rotate w-4 h-auto" src="/images/loading.svg" width={16} height={16} alt="loading" />
            </button>
          ) : (
            connected ? (
              <button className="hover-underline flex gap-1.5 text-[#9FFB98]" onClick={disconnect}>
                <span className="green">disconnect</span>
                <Image className="w-3.5 h-auto" src="/images/disconnect.svg" width={14} height={16} alt="disconnect" />
              </button>
            ) : (
              <button className="hover-underline flex gap-1.5 text-[#4CB8DA]" onClick={connect}>
                <span className="blue">connect</span>
                <Image className="w-4 h-auto" src="/images/connect.svg" width={16} height={16} alt="connect" />
              </button>
            )
          )}
        </div>
        {
          connected &&
          <div className={`flex justify-end gap-[120px] mt-2 text-sm leading-[18px] text-[#F2E144] ${oxanium.className}`}>
            <div className="flex items-center gap-2">
              <span>Account: {accounts[0].slice(0, 5)}...{accounts[0].slice(38)}</span>
              <Image className="w-2.5 h-auto -mt-px" src="/images/clipboard.svg" width={11} height={15} alt="clipboard" />
            </div>

            <span className="font-bold">Balance: {balance / 1e8} PIT</span>
          </div>
        }
      </div>

    </header>
  )
}

export default Header
