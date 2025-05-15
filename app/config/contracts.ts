export const CONTRACTS = {
  FARMING_PROJECTS: {
    // Aquí deberás reemplazar esta dirección con la dirección real de tu contrato una vez desplegado
    ADDRESS: "0x..." as `0x${string}`,
    ABI: [
      {
        inputs: [
          {
            internalType: "string",
            name: "_title",
            type: "string",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
          {
            internalType: "string",
            name: "_location",
            type: "string",
          },
          {
            internalType: "string",
            name: "_imageUrl",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_targetAmount",
            type: "uint256",
          },
        ],
        name: "createProject",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_projectId",
            type: "uint256",
          },
        ],
        name: "investInProject",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_projectId",
            type: "uint256",
          },
        ],
        name: "getProjectDetails",
        outputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "location",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageUrl",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "targetAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "projectId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "targetAmount",
            type: "uint256",
          },
        ],
        name: "ProjectCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "projectId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "investor",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "InvestmentMade",
        type: "event",
      },
    ] as const,
  },
} as const;
