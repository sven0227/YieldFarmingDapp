import { Overpass_Mono } from "@next/font/google"

const overpassMono = Overpass_Mono({ subsets: ["latin"] })

const TBD = ({title}: {title: string}) => {
  return (
    <div className={`w-[610px] h-[251px] p-[27px] text-center text-black bg-[#DAC94C] ${overpassMono.className}`}>
      <h2 className="mb-14 text-2xl font-bold">{title}</h2>
      <p className="text-xl font-bold">Under Construction...</p>
    </div>
  )
}

export default TBD
