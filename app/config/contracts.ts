export const CONTRACTS = {
  FARMING_PROJECTS: {
    ADDRESS: (process.env.NEXT_PUBLIC_FARMING_PROJECTS_ADDRESS ||
      "0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f") as `0x${string}`,
    ABI: [
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
        ],
        name: "ProjectDeleted",
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
            name: "_specificAddress",
            type: "string",
          },
          {
            internalType: "string",
            name: "_city",
            type: "string",
          },
          {
            internalType: "string",
            name: "_department",
            type: "string",
          },
          {
            internalType: "string",
            name: "_country",
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
        name: "deleteProject",
        outputs: [],
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
            name: "specificAddress",
            type: "string",
          },
          {
            internalType: "string",
            name: "city",
            type: "string",
          },
          {
            internalType: "string",
            name: "department",
            type: "string",
          },
          {
            internalType: "string",
            name: "country",
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
        inputs: [],
        name: "projectCounter",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ] as const,
  },
} as const;
