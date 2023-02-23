import type { NextPage } from "next"
import Head from "next/head"
import Layout from "@/layout"
import TBD from "@/components/TBD"

const BuySell: NextPage = () => {
  return (
    <>
      <Head>
        <title>Buy/Sell PIT</title>
      </Head>

      <Layout>
        <TBD title="Buy/Sell PIT" />
      </Layout>
    </>
  )
}

export default BuySell
