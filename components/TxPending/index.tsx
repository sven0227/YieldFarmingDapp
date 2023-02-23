import Image from "next/image"

const TxPending = () => {
  return (
    <div className="fadein flex flex-col items-center gap-4 w-[400px] h-[180px] pt-[50px] rounded-[10px] text-center bg-[#127FBCE6]">
      <h3 className="text-xl font-bold">Transaction pending</h3>
      <Image className="rotate w-12 h-auto" src="/images/loading.svg" width={155} height={150} alt="loading" />
    </div>
  )
}

export default TxPending
