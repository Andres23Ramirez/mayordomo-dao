# Mayordomo DAO 🌱

A decentralized platform connecting Colombian farmers with investors for sustainable agricultural projects.

🌐 [View Live Demo](https://mayordomo-dao.vercel.app/)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask or any Base Sepolia compatible wallet

## Environment Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/mayordomo-dao.git
    cd mayordomo-dao
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file with the following variables:

    ```env
    NEXT_PUBLIC_NODE_ENV=development
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FARMING_PROJECTS_ADDRESS=0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f
    ```

## Local Development

1. Start the Hardhat local node:

    ```bash
    npx hardhat node
    ```

2. In another terminal, run the application:

    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`

## Smart Contracts

Contracts are deployed at:

- Base Sepolia: `0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f`

To interact with the contracts you'll need:

1. Connect your wallet to Base Sepolia
2. Get test ETH from [Base Sepolia Faucet](https://sepoliafaucet.com/)

## Features

- 🌾 Agricultural project creation
- 💰 Project investment using ETH
- 📍 Project geolocation
- 🔄 Real-time investment tracking
- 🌐 Multiple wallet support

## Supported Networks

- **Development**: Hardhat Network (local)
- **Production**: Base Sepolia

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a Pull Request

## License

MIT

## Contact

For more information or support, please open an issue in the repository.
