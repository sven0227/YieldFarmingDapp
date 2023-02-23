const getShortAddress = (address: string) => {
  if (address)
    return address.slice(0, 5) + "..." + address.slice(38)
  else return ""
}

//12345678  => string 1234.5678
const bigintToString4 = (para: any) => {
  const num = BigInt(para)
  const integer = num / BigInt(1e8)
  const rest = (num % BigInt(1e8)) / BigInt(1e4) + BigInt(1e5)
  return integer.toString() + "." + rest.toString().slice(2)
}

//12345678 => 1234.5678
const difficultyToString = (para: any) => {
  const num = BigInt(para)
  const integer = num / BigInt(1e5)
  const rest = (num % BigInt(1e5)) / BigInt(10) + BigInt(1e5)
  return integer.toString() + "." + rest.toString().slice(2)
}

//123456789 => 1.23456789
const bigintToFullrange = (para: any) => {
  const num = BigInt(para)
  const integer = num / BigInt(1e8)
  const rest = (num % BigInt(1e8)) + BigInt(1e9)
  return integer.toString() + "." + rest.toString().slice(2)
}

//1234.5678 => 1234.56
const getPercentage = (para: any) => {
  const num = Math.trunc(para * 100)
  const integer = Math.trunc(num / (100))
  const rest = (num % (100)) + (100)
  return integer.toString() + "." + rest.toString().slice(1)
}

//estimated earning
const getEstEarning = (deposit: any, temp: any) => {
  let estimatedfarmingAdvantage
  const farmingPower = deposit * 1e8 / temp.difficultyOfToday
  const totalFarmingPower = Number(temp.dailyRound) + Number(temp.adjustFarmingPower)

  if (totalFarmingPower == 0) {
    estimatedfarmingAdvantage = 4000 * 30
  } else {
    estimatedfarmingAdvantage = farmingPower * 4000 * 30 / (Number(totalFarmingPower) + Number(farmingPower))
  }

  return bigintToFullrange(Number.parseInt((estimatedfarmingAdvantage * 1e8).toString()))
}

const cookAppData = (temp: any) => {
  const advantage = temp.advantage > 10 ? temp.advantage.toString().slice(0, 7) : temp.advantage.toString().slice(0, 7);

  return {
    ...temp,
    balance: bigintToString4(BigInt(temp.balance)),
    deposit: bigintToFullrange(temp.deposit),
    earningOfLevel: bigintToFullrange(temp.earningOfLevel),
    earningOfGame: bigintToFullrange(temp.earningOfGame),
    difficultyOfGame: difficultyToString(temp.difficultyOfGame),
    difficultyOfToday: difficultyToString(temp.difficultyOfToday),
    advantage,
  }
}

export {
  getShortAddress,
  bigintToString4,
  bigintToFullrange,
  cookAppData,
  getEstEarning,
  getPercentage,
}
