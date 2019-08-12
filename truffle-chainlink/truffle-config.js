/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const fullPathBuildDirectory = `${__dirname}/../src/build-ecotree/contracts`;
const HDWalletProvider = require("truffle-hdwallet-provider");
const seed =
  process.env.SEED ||
  "brand gallery sock inspire error kitten orphan arch unaware palace twin soft";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
  contracts_build_directory: fullPathBuildDirectory,
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      from: process.env.FROM_ACCOUNT
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          seed,
          "https://rinkeby.infura.io/v3/22218302c99b4ee29f8a5876ad0b552c"
        ),
      network_id: "4",
      // See issues:
      //   https://github.com/trufflesuite/truffle/issues/1612
      //   https://github.com/trufflesuite/truffle/issues/1698
      skipDryRun: true
    },
    mainnet: {
      provider: () =>
        new HDWalletProvider(seed, "https://node-green.mainnet.gnosis.pm"),
      network_id: "1",
      skipDryRun: true,
      gasPrice: 3e9
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.4.24" // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
