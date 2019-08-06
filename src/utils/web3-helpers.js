/*
 * These are helper functions used for access and interacting with web3.
 */

export function getNetworkName(networkId) {
  // https://ethereum.stackexchange.com/a/17101
  return (
    {
      "0": "Olympic",
      "1": "Mainnet",
      "2": "Morden Classic",
      "3": "Ropsten",
      "4": "Rinkeby",
      "5": "Goerli",
      "6": "Kotti Classic",
      "8": "Ubiq",
      "42": "Kovan",
      "60": "GoChain",
      "77": "Sokol",
      "99": "Core",
      "100": "xDai",
      "31337": "GoChain testnet",
      "401697": "Tobalaba",
      "7762959": "Musicoin",
      "61717561": "Aquachain"
    }[String(networkId)] || `Network ID ${networkId}`
  );
}

export function getReadOnlyProviderForNetworkId(networkId) {
  const providerName = {
    "1": "mainnet",
    "3": "ropsten",
    "4": "rinkeby",
    "5": "goerli",
    "42": "kovan"
  }[String(networkId)];

  return providerName == null
    ? null
    : `wss://${providerName}.infura.io/ws/v3/a891f75ad4e947338aeba96873c0b110`;
}

/*
 * @dev isAnyUnlockedAccount  Resolves if provider has at least one unlocked account. Rejects otherwise.
 * @param web3                Web from Web3Provider injected by Ethereum-enabled browser.
 */
export function isAnyUnlockedAccount(web3) {
  return new Promise((resolve, reject) => {
    return web3.eth
      .getAccounts()
      .then(accounts => {
        if (accounts.length >= 1) {
          resolve();
        } else {
          reject();
        }
      })
      .catch(reject);
  });
}

/*
 * @dev getDefaultAccount     Resolves the address of the current default account from provider.
 * @param web3                Web from Web3Provider injected by Ethereum-enabled browser.
 */
export function getDefaultAccount(web3) {
  return new Promise((resolve, reject) => {
    return web3.eth
      .getAccounts()
      .then(accounts => {
        if (accounts.length < 1) {
          throw new Error("Please unlock your MetaMask account!");
        }
        resolve(accounts[0]);
      })
      .catch(reject);
  });
}

/*
 * @dev getNetworkName        Resolves the name of the current network the provider is connected to (e.g. Rinkeby, etc.).
 * @param web3                Web from Web3Provider injected by Ethereum-enabled browser.
 */
export function getNetworkNameOld(web3) {
  return new Promise((resolve, reject) => {
    return web3.eth.net
      .getNetworkType()
      .then(resolve)
      .catch(reject);
  });
}
