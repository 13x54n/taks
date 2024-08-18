module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    // other network configurations
  },
  compilers: {
    solc: {
      version: "0.8.25", // Specify the Solidity version
    },
  },
};
