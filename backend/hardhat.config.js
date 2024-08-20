require("@nomicfoundation/hardhat-toolbox"); 

const PRIVATE_KEY = "37a93ee69ee0b9ca60c0b8f5b2160eb65d3b1a12a813ef7c24ebcda99b86a748";

module.exports = {
  solidity: "0.8.23",
  networks: {
    hedera: {
      url: `https://testnet.hashio.io/api`,
      accounts: [PRIVATE_KEY]
    }
  }
};