export class ContractModel {
  contract: any
  wallet: any
  constructor() {
  }

  setContract(contract: any) {
    this.contract = contract
  }

  setWallet(acc: any) {
    this.wallet = acc
  }

  getBalance(address: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const balance = await this.contract.balanceOf(address)
        resolve(balance)
      } catch (e) {
        reject(e)
      }
    })
  }

  async getFarmInfo() {
    try {
      const farmArray = await this.contract.getMyFarm()
      const currentDay = await this.contract.getDay()
      let yieldVal = 0
      let farmInfo = {
        farmingID: farmArray[0],
        lockedAmount: farmArray[1],
        startDay: farmArray[2].toString(),
        farmingPower: farmArray[3].toString(),
        difficulty: farmArray[4],
        completedLevels: farmArray[5].toString(),
        deposit: farmArray[6],
        currentDay: currentDay
      }

      if (farmInfo.farmingID > 0) {
        yieldVal = await this.contract.getYield()
      }

      return { ...farmInfo, yieldVal }
    } catch (error: any) {
      return error.reason
    }
  }

  getAppData() {
    return new Promise(async (resolve, reject) => {
      try {
        let yieldArray: any = [0, 0]
        let earningOfGame: any = ""
        const balance = await this.contract.balanceOf(this.wallet)
        const farmArray = await this.contract.getMyFarm()
        const currentDay = await this.contract.getDay()
        const lastUpdatedDay = await this.contract.getLastUpdatedDay()
        const dailyRound = await this.contract.dailyRounds(lastUpdatedDay)
        const adjustFarmingPower = await this.contract.adjustFarmingPower(lastUpdatedDay.add(1))
        const difficultyOfGame = farmArray["difficulty"]
        const difficultyOfToday = currentDay * 40 + 1e5
        const advantage = (100 - 100 * difficultyOfGame / difficultyOfToday)

        if (farmArray[0] > 0) {
          yieldArray = await this.contract.getYield()
          earningOfGame = Number(yieldArray[0]) + Number(farmArray["lockedAmount"]) - farmArray["deposit"]
        }

        const farmingData = {
          success: true,
          balance: balance.toString(),
          farmingID: farmArray[0].toString(),
          lockedAmount: farmArray[1].toString(),
          startDay: (farmArray[2]).toString(),
          farmingPower: farmArray[3].toString(),
          difficulty: farmArray[4].toString(),
          completedLevels: farmArray[5].toString(),
          deposit: farmArray[6],
          wallet: this.wallet.toString(),
          currentDay: currentDay.toString(),
          elapsedDays: (currentDay - farmArray[2].toString()),
          remainingDays: 30 - (currentDay - farmArray[2].toString()),
          deadline1Days: 45 - (currentDay - farmArray[2].toString()),
          deadline2Days: 60 - (currentDay - farmArray[2].toString()),
          endDay: farmArray[2] + 30,
          lastUpdatedDay: lastUpdatedDay.toString(),
          dailyRound: dailyRound.toString(),
          adjustFarmingPower: adjustFarmingPower.toString(),
          earningOfLevel: yieldArray[0].toString(),
          earningOfGame: earningOfGame,
          level: farmArray[5] + 1,
          difficultyOfGame: (farmArray[4]).toString(),
          advantage: advantage,
          difficultyOfToday: difficultyOfToday
        }

        resolve(farmingData)
      } catch (e: any) {
        resolve({ success: false, reason: e.reason })
      }
    })
  }

  async startFarming(amount: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let startTx = await this.contract.startFarming(amount)
        let eventResult
        this.contract.on(
          "StartFarming",
          (farmer: string, farmingID: string, startDay: string, farmingPower: string) => {
            eventResult = {
              farmer: farmer,
              farmingID: farmingID,
              startDay: startDay,
              farmingPower: farmingPower,
            }
          }
        )
        let txReceipt = await startTx.wait()
        let txHash = txReceipt.events[0].transactionHash
        resolve({ txHash, success: true })
      } catch (e: any) {
        resolve({ reason: e.reason, success: false })
      }
    })
  }

  harvest() {
    return new Promise(async (resolve, reject) => {
      try {
        let startTx = await this.contract.harvest()
        let txReceipt = await startTx.wait()
        let txHash = txReceipt.events[0].transactionHash
        resolve({ txHash, success: true })
      } catch (err: any) {
        resolve({ reason: err.reason, success: false })
      }
    })
  }

  level_up() {
    return new Promise(async (resolve, reject) => {
      try {
        let startTx = await this.contract.levelup()
        let txReceipt = await startTx.wait()
        let txHash = txReceipt.events[0].transactionHash
        resolve({ txHash, success: true })
      } catch (err: any) {
        resolve({ reason: err.reason, success: false })
      }
    })
  }
}
