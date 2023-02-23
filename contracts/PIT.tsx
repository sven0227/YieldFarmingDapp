export const PITAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "destroy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "harvest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "farmer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint40",
				"name": "farmingID",
				"type": "uint40"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "payout",
				"type": "uint256"
			}
		],
		"name": "Harvest",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "levelup",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "farmer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint40",
				"name": "farmingID",
				"type": "uint40"
			},
			{
				"indexed": true,
				"internalType": "uint16",
				"name": "startDay",
				"type": "uint16"
			},
			{
				"indexed": false,
				"internalType": "uint56",
				"name": "farmingPower",
				"type": "uint56"
			},
			{
				"indexed": false,
				"internalType": "uint16",
				"name": "completedLevels",
				"type": "uint16"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "farmingYield",
				"type": "uint256"
			}
		],
		"name": "LevelUp",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint56",
				"name": "amount",
				"type": "uint56"
			}
		],
		"name": "startFarming",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "farmer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint40",
				"name": "farmingID",
				"type": "uint40"
			},
			{
				"indexed": true,
				"internalType": "uint16",
				"name": "startDay",
				"type": "uint16"
			},
			{
				"indexed": false,
				"internalType": "uint56",
				"name": "farmingPower",
				"type": "uint56"
			},
			{
				"indexed": false,
				"internalType": "uint56",
				"name": "deposit",
				"type": "uint56"
			}
		],
		"name": "StartFarming",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_day",
				"type": "uint16"
			}
		],
		"name": "updateDailyRounds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "adjustFarmingPower",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "dailyRounds",
		"outputs": [
			{
				"internalType": "uint72",
				"name": "",
				"type": "uint72"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "farmingDB",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "farmingID",
				"type": "uint32"
			},
			{
				"internalType": "uint56",
				"name": "lockedAmount",
				"type": "uint56"
			},
			{
				"internalType": "uint16",
				"name": "startDay",
				"type": "uint16"
			},
			{
				"internalType": "uint56",
				"name": "farmingPower",
				"type": "uint56"
			},
			{
				"internalType": "uint32",
				"name": "difficulty",
				"type": "uint32"
			},
			{
				"internalType": "uint8",
				"name": "completedLevels",
				"type": "uint8"
			},
			{
				"internalType": "uint56",
				"name": "deposit",
				"type": "uint56"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getActiveFarms",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAvgDeposit",
		"outputs": [
			{
				"internalType": "uint72",
				"name": "",
				"type": "uint72"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAvgLocked",
		"outputs": [
			{
				"internalType": "uint72",
				"name": "",
				"type": "uint72"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCirculatingSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "j",
				"type": "uint256"
			}
		],
		"name": "getDailyRound",
		"outputs": [
			{
				"internalType": "uint72",
				"name": "",
				"type": "uint72"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDay",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEntireSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "farmer",
				"type": "address"
			}
		],
		"name": "getFarm",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "farmingID",
						"type": "uint32"
					},
					{
						"internalType": "uint56",
						"name": "lockedAmount",
						"type": "uint56"
					},
					{
						"internalType": "uint16",
						"name": "startDay",
						"type": "uint16"
					},
					{
						"internalType": "uint56",
						"name": "farmingPower",
						"type": "uint56"
					},
					{
						"internalType": "uint32",
						"name": "difficulty",
						"type": "uint32"
					},
					{
						"internalType": "uint8",
						"name": "completedLevels",
						"type": "uint8"
					},
					{
						"internalType": "uint56",
						"name": "deposit",
						"type": "uint56"
					}
				],
				"internalType": "struct GlobalVariables.FarmingData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLastUpdatedDay",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyFarm",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "farmingID",
						"type": "uint32"
					},
					{
						"internalType": "uint56",
						"name": "lockedAmount",
						"type": "uint56"
					},
					{
						"internalType": "uint16",
						"name": "startDay",
						"type": "uint16"
					},
					{
						"internalType": "uint56",
						"name": "farmingPower",
						"type": "uint56"
					},
					{
						"internalType": "uint32",
						"name": "difficulty",
						"type": "uint32"
					},
					{
						"internalType": "uint8",
						"name": "completedLevels",
						"type": "uint8"
					},
					{
						"internalType": "uint56",
						"name": "deposit",
						"type": "uint56"
					}
				],
				"internalType": "struct GlobalVariables.FarmingData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getYield",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "yield",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastDay",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "globals",
		"outputs": [
			{
				"internalType": "uint72",
				"name": "totalLocked",
				"type": "uint72"
			},
			{
				"internalType": "uint72",
				"name": "totalDeposits",
				"type": "uint72"
			},
			{
				"internalType": "uint32",
				"name": "lastID",
				"type": "uint32"
			},
			{
				"internalType": "uint16",
				"name": "lastUpdatedDay",
				"type": "uint16"
			},
			{
				"internalType": "uint32",
				"name": "completedFarms",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const PITAddress = "0xEe80212570c41E1D21C7B0FA1d2539945fC88868"
