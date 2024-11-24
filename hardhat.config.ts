import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "hardhat-deploy";

import dotenv from "dotenv";
dotenv.config();

const { ARBISCAN_API_KEY, ARBITRUM_SEPOLIA_RPC_URL, WALLET_PRIVATE_KEY } =
  process.env;

if (!ARBISCAN_API_KEY || !ARBITRUM_SEPOLIA_RPC_URL || !WALLET_PRIVATE_KEY) {
  throw new Error("Missing environment variables");
}

const ACCOUNTS = [WALLET_PRIVATE_KEY];

const SOLC_SETTING = {
  optimizer: {
    enabled: true,
    runs: 200,
  },
}

const defaultNetwork = "hardhat";

const config: HardhatUserConfig = {
  defaultNetwork,
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
      url: "http://localhost:8545",
    },
    arbitrumSepolia: {
      chainId: 421614,
      url: ARBITRUM_SEPOLIA_RPC_URL,
      accounts: ACCOUNTS,
    },
  },
  etherscan: {
    apiKey: {
      arbitrumSepolia: ARBISCAN_API_KEY,
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: SOLC_SETTING,
      },
      {
        version: "0.8.23",
        settings: SOLC_SETTING,
      },
      {
        version: "0.8.22",
        settings: SOLC_SETTING,
      },
      {
        version: "0.8.21",
        settings: SOLC_SETTING,
      },
      {
        version: "0.8.20",
        settings: SOLC_SETTING,
      },
      {
        version: "0.8.19",
        settings: SOLC_SETTING,
      },
    ]
  },
  mocha: {
    timeout: 200000,
  },
};

export default config;
