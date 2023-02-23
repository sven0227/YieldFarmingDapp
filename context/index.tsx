import { createContext, useContext, useState } from "react"
import { ethers } from "ethers"
import { PITAbi, PITAddress } from "@/contracts/PIT"
import { ContractModel } from "./model"
import { cookAppData } from "@/utils"
import constants from "@/utils/constants"

declare global {
  interface Window {
    ethereum?: any
  }
}

let g_Model: any

interface IAppContext {
  gameStatus: string
  actionStatus: string
  txStatus: string
  appData: any
  changeStatus: any
  appDataTemp: any
  update: any
  wallet: any
}

interface IAppContextProvider {
  children: any
}

const defaultState = {
  gameStatus: "",
  actionStatus: "",
  txStatus: "",
  appData: {},
  changeStatus: () => { },
  appDataTemp: {},
  update: () => { },
  wallet: {}
}

const AppContext = createContext<IAppContext>(defaultState)

export function AppContextProvider({ children }: IAppContextProvider) {
  const [gameStatus, setGameStaus] = useState<string>(constants.DISCONNECTED)
  const [actionStatus, setActionStatus] = useState<string>("")
  const [txStatus, setTxStatus] = useState<string>("")
  const [appDataTemp, setAppDataTemp] = useState<any>({})
  const [appData, setAppData] = useState<any>({})
  const [provider, setProvider] = useState<any>()
  const [contract, setContract] = useState<any>()
  const [wallet, setWallet] = useState<any>()
  let signer, accounts: any

  const changeStatus = async (action: string, payload: any) => {
    switch (gameStatus) {
      case constants.DISCONNECTED:
        if (action == constants.connect) {
          await connect()
        }
        break
      case constants.NEW_GAME:
        if (actionStatus != constants.START && action == constants.start) {
          if (appDataTemp.balance < payload * 1e8) {
            setActionStatus(constants.BLINK)
            setTimeout(() => {
              setActionStatus(constants.DISPLAY)
            }, 1000)
          }
          else startFarm(payload)
        }
        if (actionStatus == constants.START) {
          if (txStatus == constants.FAILED && action == constants.okay) setActionStatus(constants.DISPLAY)
          if (txStatus == constants.SUCCESS && action == constants.okay) {
            await update()
            setGameStaus(constants.FARMING)
            setActionStatus(constants.DISPLAY)
          }
        }
        break
      case constants.FARMING:
        break
      case constants.DEADLINE_1:
        if (action == constants.harvest) harvest()
        if (action == constants.level_up) level_up()
        if (actionStatus == constants.HARVEST) {
          if (txStatus == constants.FAILED && action == constants.okay) setActionStatus(constants.DISPLAY)
          if (txStatus == constants.SUCCESS && action == constants.okay) {
            await update()
            setGameStaus(constants.NEW_GAME)
            setActionStatus(constants.DISPLAY)
          }
        }
        if (actionStatus == constants.LEVEL_UP) {
          if (txStatus == constants.FAILED && action == constants.okay) setActionStatus(constants.DISPLAY)
          if (txStatus == constants.SUCCESS && action == constants.okay) {
            await update()
            setGameStaus(constants.FARMING)
            setActionStatus(constants.DISPLAY)
          }
        }
        break
      case constants.DEADLINE_2:
        if (action == constants.harvest) harvest()
        if (actionStatus == constants.HARVEST) {
          if (txStatus == constants.FAILED && action == constants.okay) setActionStatus(constants.DISPLAY)
          if (txStatus == constants.SUCCESS && action == constants.okay) {
            await update()
            setGameStaus(constants.NEW_GAME)
            setActionStatus(constants.DISPLAY)
          }
        }
        break
      case constants.GAMEOVER:
        if (action == constants.remove) remove()
        if (actionStatus == constants.REMOVE) {
          if (txStatus == constants.FAILED && action == constants.okay) setActionStatus(constants.DISPLAY)
          if (txStatus == constants.SUCCESS && action == constants.okay) {
            await update()
            setGameStaus(constants.NEW_GAME)
            setActionStatus(constants.DISPLAY)
          }
        }
        break
      default:
        break
    }

    if (gameStatus != constants.DISCONNECTED) {
      if (action == constants.disconnect) {
        disconnect()
      }
    }
  }

  const update = async () => {
    let g_gameStatus: any
    const farmInfo: any = await g_Model.getAppData()
    if (farmInfo.success == false) {
      return
    }
    if (farmInfo.farmingID > 0) {
      if (farmInfo.currentDay < farmInfo.endDay) {
        g_gameStatus = constants.FARMING
      }
      else if (farmInfo.currentDay - farmInfo.endDay < 16)
        g_gameStatus = constants.DEADLINE_1
      else if (farmInfo.currentDay - farmInfo.endDay > 15 && farmInfo.currentDay - farmInfo.endDay < 31)
        g_gameStatus = constants.DEADLINE_2
      else if (farmInfo.currentDay - farmInfo.endDay > 30)
        g_gameStatus = constants.GAMEOVER
    }
    else g_gameStatus = constants.NEW_GAME
    setGameStaus(g_gameStatus)

    const temp = { ...appDataTemp, ...farmInfo }
    const appData = cookAppData(temp)
    setAppDataTemp(temp)
    setAppData(appData)
  }

  const connect = async () => {
    if (window.ethereum) {
      try {
        setGameStaus(constants.CONNECTING)
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)
        signer = provider.getSigner()
        const contracts = new ethers.Contract(PITAddress, PITAbi, signer)
        setContract(contracts)
        const Model = new ContractModel
        Model.setContract(contracts)
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setWallet(accounts[0])
        Model.setWallet(accounts[0])
        window.ethereum.on("accountsChanged", handleAccountsChanged)
        g_Model = Model

        const farmInfo: any = await Model.getAppData()
        if (farmInfo.farmingID == 0) {
          setGameStaus(constants.CUTSCENE_1)
          setTimeout(() => {
            setGameStaus(constants.NEW_GAME)
            setActionStatus(constants.DISPLAY)
          }, 7000)
        }
        else {
          if (farmInfo.currentDay < farmInfo.endDay)
            setGameStaus(constants.FARMING)
          else if (farmInfo.currentDay - farmInfo.endDay < 16)
            setGameStaus(constants.DEADLINE_1)
          else if (farmInfo.currentDay - farmInfo.endDay > 15 && farmInfo.currentDay - farmInfo.endDay < 31)
            setGameStaus(constants.DEADLINE_2)
          else if (farmInfo.currentDay - farmInfo.endDay > 30)
            setGameStaus(constants.GAMEOVER)
        }
        setActionStatus(constants.DISPLAY)
        setAppData(cookAppData(farmInfo))
      } catch (e) {
        console.error(e)
      }
    }
  }

  const startFarm = async (ammount: any) => {
    setActionStatus(constants.START)
    setTxStatus(constants.PENDING)
    const result: any = await g_Model.startFarming(Math.trunc(ammount * 1e8))
    if (result.success) {
      setTxStatus(constants.SUCCESS)
      setAppData({ ...appData, txHash: result.txHash })
    } else {
      setTxStatus(constants.FAILED)
    }
  }

  const level_up = async () => {
    setActionStatus(constants.LEVEL_UP)
    setTxStatus(constants.PENDING)
    const result: any = await g_Model.level_up()
    if (result.success) {
      setTxStatus(constants.SUCCESS)
      setAppData({ ...appData, txHash: result.txHash })
    } else {
      setTxStatus(constants.FAILED)
    }
  }

  const remove = async () => {
    setActionStatus(constants.REMOVE)
    setTxStatus(constants.PENDING)
    const result: any = await g_Model.harvest()
    if (result.success) {
      setTxStatus(constants.SUCCESS)
      setAppData({ ...appData, txHash: result.txHash })
    } else {
      setTxStatus(constants.FAILED)
    }
  }

  const harvest = async () => {
    setActionStatus(constants.HARVEST)
    setTxStatus(constants.PENDING)
    const result: any = await g_Model.harvest()
    if (result.success) {
      setTxStatus(constants.SUCCESS)
      setAppData({ ...appData, txHash: result.txHash })
    } else {
      setTxStatus(constants.FAILED)
    }
  }

  const handleAccountsChanged = async (accounts: any) => {
    setWallet(accounts[0])
    g_Model.setWallet(accounts[0])
    await update()
  }

  const disconnect = () => {
    const { provider: ethereum } = provider
    ethereum.removeAllListeners("accountsChanged")
    setGameStaus(constants.DISCONNECTED)
  }

  return (
    <AppContext.Provider value={{
      gameStatus, actionStatus, txStatus, appData, changeStatus, appDataTemp, update, wallet
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
