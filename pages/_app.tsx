import type { AppProps } from "next/app"
import { Overpass_Mono } from "@next/font/google"
import 'tailwindcss/base.css'
import 'tailwindcss/components.css'
import 'tailwindcss/utilities.css'
import "@/styles/globals.scss"
import { AppContextWrapper } from "@/context"


const overpass_mono = Overpass_Mono({ subsets: ["latin"] })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppContextWrapper>
      <div className={overpass_mono.className}>
        <Component {...pageProps} />
      </div>
    </AppContextWrapper>
  )
}

export default App
