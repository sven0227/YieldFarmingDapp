import { createContext, useContext, useState } from "react"
import { ethers } from "ethers"
import PITAbi from "@/contracts/PIT.json"


declare global {
  interface Window {
    ethereum?: any
  }
}

const PITAddress = "0xebA5a40B6C14bA923e7EA240CD76Bfe7BC606945" //Polygon Mumbai Testnet

interface IThemeContext {
  connected: boolean
  connecting: boolean
  accounts: string[]
  setAccounts?: any
  contract?: any
  connect?: any
  disconnect?: any
}

interface IAppContextWrapper {
  children: any
}

const defaultState = {
  connected: false,
  connecting: false,
  accounts: [],
  setAccounts: () => { },
  contract: [],
  connect: () => { },
  disconnect: () => { }
};

const AppContext = createContext<IThemeContext>(defaultState)

export function AppContextWrapper({ children }: IAppContextWrapper) {

  const [connected, setWalletConnected] = useState<boolean>(false)
  const [connecting, setWalletConnecting] = useState<boolean>(false)
  const [provider, setProvider] = useState<any>(null)
  const [signer, setSigner] = useState<any>(null)
  const [contract, setContract] = useState<any>(null)
  const [accounts, setAccounts] = useState<string[]>([])

  const connect = async () => {

    if (window.ethereum) {

      try {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(PITAddress, PITAbi, signer)

        setWalletConnecting(true)
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setWalletConnected(true)
        setWalletConnecting(false)
        window.ethereum.on("accountsChanged", setAccounts)
        setProvider(provider)
        setSigner(signer)
        setContract(contract)
        setAccounts(accounts)
      } catch (e) {
      } finally {

      }
    } else {
    }
  };

  const disconnect = () => {
    window.ethereum.removeListener("accountsChanged", setAccounts)
    setWalletConnected(false)
    setAccounts([])
  }

  return (
    <AppContext.Provider value={{ connected, connecting, accounts, setAccounts, contract, connect, disconnect }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext)
}