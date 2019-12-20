# Prediction Market
A prediction market for carbon offsets powered by Chainlink oracles and Gnosis’ new Mercury v2 smart contracts and conditional market makers. Users take carbon offset positions based on CO2 emissions being offset by the planting and growth of trees.

## Code Structure

The FCLA Carbon Offsets Prediction Market enables environmentally conscious users to leverage carbon offset data to bet for or against the continued growth of specific forests. Via Chainlink’s network of Oracle Node Operators, forestry data is brought on-chain in an appropriately distributed manner. Forestry data is sourced via a (Chainlink-enabled) integration with EcoTree (see https://EcoTree.fr), a French forestry company which tracks and sells plots of forest throughout France. The prediction market architecture is based on Gnosis’ new Mercury v2 smart contracts and conditional market makers. The UI was built using React and Web3 best practices, including no built configuration, Typescript, Drizzle, Redux, Rimble and proper components architecture.

## Smartcontracts

Gnosis uses the EcoTree Chainlinked Contract: https://rinkeby.etherscan.io/address/0xCCccCb48132191636B95aBF45e32BaFbf5A77f5c

Gnosis uses this Division Contract where EcoTree / AMF attest to divisions: https://rinkeby.etherscan.io/address/0x76b8e6AcB389090f38d37A82d521d8ef0D6E2318

Current is the current amount of euros of all trees on EcoTree are worth. 

Oracle for Gnosis PM that imports form Chainlink contract: 0xB4baf3B840bdD05f0154558B980AF50a0daB78b0

NFT's of trees: https://rinkeby.etherscan.io/tx/0x2fe5494f19c22b59ee9a9b82a76ac5eb3e78e9afe79cfae86996fd67f7d4dd79

Trees on Opensea: https://rinkeby.opensea.io/accounts/0x6ea295f8f0ea207bd2e4d07f13e003701e152b16

## Available markets
Carbon offset

## Workflow

### PM Dashboard workflow
<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/pm_dashboard.png" />
</p>

### PM Dashboard Code Structure
<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/react_workflow_pm_dashboard.png" />
</p>

#### Carbon market
<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/carbon-market.png" />
</p>

#### Carbon info box
<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/carbon-info-box.png" />
</p>

### Working Product

### Screenshots

<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/dashboard.jpg" />
</p>

<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/position.jpeg" />
</p>

<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/market_information.jpeg" />
</p>

<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/new_position.jpeg" />
</p>

<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/faucet.jpeg" />
</p>

#### Dashboard / Markets
<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/markets.png" />
</p>

#### Create New Trade
<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/create_new_position.png" />
</p>

#### Trade Confirmation
<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/create_new_position_confirmation.png" />
</p>

#### Trade Confirmed
<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/new_position_confirmation.png" />
</p>

#### Positions
<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/positions.png" />
</p>

## Usage Instructions

1. Ensure that your MetaMask is connected to the Rinkeby testnet and that you have some Rinkeby test ETH (you can get more here: https://faucet.rinkeby.io/).
2. You need some test DAI to create positions on the FCLA PM. You can mint some to your MetaMask account via our faucet. Navigate [here](https://oneclickdapp.com/action-alibi/), select the `mint` function, enter your MetaMask address and the amount of testnet DAI you would like (NOTE: this number is denoted in Wei, for example if you enter `25000000000000000000` you will receive 25DAI on the testnet).
3. Navigate to the [FCLA PM](http://pm.flyingcarpet.network/), after signing the MetaMask connection dialog, you can then trade on any of the avaliable markets using your testnet DAI.
4. (Optional) If you would like to display your testnet DAI balance inside of your MetaMask currency list, open the MetaMask dialog, click the three horizontal bars in the upper left, and then click `Add Token` at the bottom of that dialog. Next, click the `Custom Token` tab and enter the testnet DAI address (`0xEFC8876B9F411F1e610668CE62992886A65c913d`) in the `Token Contract Address` field, `DAI` as the `Token Symbol`, and `18` in the `Decimals of Precision` field. You will now see your testnet DAI balance in the list of tokens when you click the three horizontal bars on the upper left of the MetaMask dialog.

## Advanced Usage Instructions

Although not necessary for most users, it is possible to refresh the Chainlinked data that is cached inside the FCLA smart contract (e.g. when the Chainlinked geospatial endpoints contain fresh information). To update the Chainlinked data, please follow these instructions:

1. Obtain some Rinkeby LINK tokens from the Chainlink faucet here: https://rinkeby.chain.link/
2. To display your LINK balance inside of your MetaMask currency list, open the MetaMask dialog, click the three horizontal bars in the upper left, and then click `Add Token` at the bottom of that dialog. Next, click the `Custom Token` tab and enter the LINK token address (`0x01be23585060835e02b77ef475b0cc51aa1e0709`) in the `Token Contract Address` field, `LINK` as the `Token Symbol`, and `18` in the `Decimals of Precision` field. You will now see your Rinkeby LINK balance in the list of tokens when you click the three horizontal bars on the upper left of the MetaMask dialog.
3. Inside the MetaMask dialog, send some newly acquired LINK tokens to the Rinkeby FCLA Chainlink contract address: `0xd8E1E592f77969607c65DA1683769614ACf6b4fC`. NOTE: each forest update within the FCLA contract currently costs 5 LINK tokens, so to update all five forests costs: `5 * 5 = 25 LINK Tokens`.
4. To refresh the cached data from Chainlink, call the `refreshForests` function from the FCLA Chainlink contract [here](https://oneclickdapp.com/collect-fiction/). In the `_jobId` field enter `0xb0bde308282843d49a3a8d2dd2464af1` (the correct `jobId` for Rinkeby `GET` requests, see [here](https://docs.chain.link/docs/testnet-oracles) for more information). In the `_numForests` field enter the number of forests you would like to refresh (in index order), currently the maximum supported by the contract is all five forests (to update all forests' data simply enter `5`).
5. Submit the function call with a sufficent amount of gas (the current version may require as much as `7000000` gas). Once submitted it may take some time to process, monitor the transaction on [Etherscan](https://rinkeby.etherscan.io/address/0xd8E1E592f77969607c65DA1683769614ACf6b4fC).
6. Once confirmed, the forest data inside the FCLA contract will be refreshed and this will be reflected in the PM dApp: http://pm.flyingcarpet.network/

## Development Instructions

1. Run `yarn install`
2. In a separate terminal, run `ganache-cli -d`
3. Run `npm run migrate`
4. Start the dev server with `npm start`

It will generate a build folder inside the root with the styles, JS assets and contracts.

## Demo

Go to `pm.flyingcarpet.network`

LSMR Contract deployed on [https://rinkeby.etherscan.io/address/0xaf89C9677c69e11c15aB2651885387dfD4B2778F](0xaf89C9677c69e11c15aB2651885387dfD4B2778F)


## Environnement variables

`.env` and `.env.production` can overwrite environnement variables such as networkID for deployment etc.

## LMSRMarketMaker

Contract address is saved into `src/build/contracts/Migrations.json`:

```
"networks": {
  "1565085406360": {
    "events": {},
    "links": {
      "Fixed192x64Math": "0xB349FB172D6D5f693b0aA1C6eEc4c61cFd6846f4"
    }
  }
```

If not saved during build process. The LSMR address needs to be saved into `src/config.json`. It changes everytime migration is run.

## Debug Instructions

Run `npm run build-css` generate CSS assets separately.
Run `npm run build-js` to generate JS assets separately.

### Running Helper Scripts

For operating the LMSR market maker

    npx truffle exec scripts/operate_lmsr.js

For resolving the decentralized oracles

    npx truffle exec scripts/resolve_decentralized_oracles.js

## Troubleshooting

### No enough gas for deploying contracts

Run:

1. `rm -rf src/build`
2. `npm stop`
3. `npm run compile`
4. `npm run migrate`
5. `npm start`

### Empty Websocket Dependency Directory Build Errors

If, after installing a new module, you see an error of the following form:

```
npm ERR! path /root_path/flyingcarpet/prediction-market/node_modules/web3-providers-ws/node_modules/websocket
npm ERR! code EISGIT
npm ERR! git /root_path/flyingcarpet/prediction-market/node_modules/web3-providers-ws/node_modules/websocket: Appears to be a git repo or submodule.
npm ERR! git     /root_path/flyingcarpet/prediction-market/node_modules/web3-providers-ws/node_modules/websocket
npm ERR! git Refusing to remove it. Update manually,
npm ERR! git or move it out of the way first.
```

It means that one (or multiple) of the `websocket` module dependencies has been corrupted. Run the following to delete all websocket module dependencies (including sub-dependencies):

```
find . -name websocket -exec rm -rf {} \;
```

Next, proceed with the installation of your module (e.g.: `npm install additional-module --save`). Afterwards, run the above (deletion) command again. Finally, you'll need to run:

```
npm i
```

Now the module dependency structure should be fixed with the new module installed.
