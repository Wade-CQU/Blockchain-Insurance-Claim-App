export const ContractABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "getClaimInfo",
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {"name": "claimNumber", "type": "string"},
          {"name": "accNumber", "type": "string"},
          {"name": "firstName", "type": "string"},
          {"name": "lastName", "type": "string"},
          {"name": "email", "type": "string"},
          {"name": "vehcileReg", "type": "string"},
          {"name": "accidentDesc", "type": "string"},
          {"name": "dateOfAccident", "type": "string"},
          {"name": "progress", "type": "string"}
        ]
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "_claimNumber", "type": "string"},
      {"name": "_accNumber", "type": "string"},
      {"name": "_firstName", "type": "string"},
      {"name": "_lastName", "type": "string"},
      {"name": "_email", "type": "string"},
      {"name": "_vehicleReg", "type": "string"},
      {"name": "_accidentDesc", "type": "string"},
      {"name": "_dateOfAccident", "type": "string"},
      {"name": "_progress", "type": "string"}
    ],
    "name": "setClaimInfo",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

