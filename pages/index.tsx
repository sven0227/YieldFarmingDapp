import { useEffect } from 'react'
import type { NextPage } from "next"
import Head from "next/head"
import Layout from "@/layout"
import Intro from "@/components/Intro"
import CutScene1 from "@/components/CutScene1"
import NewGame from "@/components/NewGame"
import FarmingInfo from "@/components/FarmingInfo"
import Deadline1 from "@/components/Deadline1"
import Deadline2 from "@/components/Deadline2"
import GameOver from "@/components/GameOver"
import { useAppContext } from "@/context"
import constants from "@/utils/constants"

const Home: NextPage = () => {
  const { gameStatus, actionStatus, txStatus, appData, changeStatus, update, wallet } = useAppContext()

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("GAME_STATUS:", gameStatus)
      console.log("ACTION_STATUS:", actionStatus)
      console.log("APP_DATA:", appData)

      if (gameStatus !== constants.DISCONNECTED && gameStatus !== constants.CUTSCENE_1 && actionStatus === constants.DISPLAY) {
        update()
      }
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [gameStatus, actionStatus, wallet])

  return (
    <>
      <Head>
        <title>PIT master</title>
      </Head>

      <Layout>
        {gameStatus === constants.DISCONNECTED && <Intro />}
        {gameStatus === constants.CONNECTING && <></>}
        {gameStatus === constants.CUTSCENE_1 && <CutScene1 />}
        {gameStatus === constants.NEW_GAME && <NewGame />}
        {gameStatus === constants.FARMING && <FarmingInfo />}
        {gameStatus === constants.DEADLINE_1 && <Deadline1 />}
        {gameStatus === constants.DEADLINE_2 && <Deadline2 />}
        {gameStatus === constants.GAMEOVER && <GameOver />}
      </Layout >
    </>
  )
}

export default Home
