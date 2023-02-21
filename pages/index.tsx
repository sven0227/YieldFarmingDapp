import type { NextPage } from "next"
import Head from "next/head"
import Layout from "@/layout"
import { useAppContext } from "@/context"
import { useState } from 'react'


const defaultParams = {
  depositAmount: 10
}

const Home: NextPage = () => {

  const { connected, connecting, connect, setAccounts, accounts, contract } = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [startFarming, setStartFarming] = useState<any>({
    farmer: "Loading...",
    farmingID: "Loading...",
    startDay: "Loading...",
    farmingPower: "Loading...",
  })
  const [isSuccess, setSuccess] = useState<boolean>(false)
  const [isFailed, setFailed] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>("")

  const onClickStartFarming = async () => {
    try {
      let stakeTx = await contract.startFarming(defaultParams.depositAmount * 1e8)
      setLoading(true)

      contract.on(
        "StartFarming",
        (farmer: string, farmingID: string, startDay: string, farmingPower: string) => {
          setStartFarming({
            farmer: farmer,
            farmingID: farmingID,
            startDay: startDay,
            farmingPower: farmingPower,
          })
        }
      )

      let txReceipt = await stakeTx.wait()
      setTxHash(txReceipt.events[0].transactionHash)
      setSuccess(true)
      setFailed(false)
    } catch (err) {
      console.log("Transaktion ist fehlgeschlagen!")
      setLoading(false)
      setSuccess(false)
      setFailed(true)
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>PIT master</title>
      </Head>

      <Layout>
        <h1>Homepage.</h1>
      </Layout>
    </>
  )
}

export default Home
