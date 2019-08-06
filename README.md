# prediction-market
FCLA decentralized prediction markets.

## Code Structure
FCLA decentralized prediction markets is based on Gnosis hg-first-decentralized-market core which has been completely rewritten to use React modern build setup with no configuration, typescript, drizzle, redux and proper components architecture.

## Workflow

### PM Dashboard workflow
<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/pm_dashboard.png" />
</p>

### PM Dashboard Code Structure
<p align="center">
  <img width="400px" src="https://github.com/flyingcarpet-network/prediction-market/blob/master/src/assets/workflow/react_workflow_pm_dashboard.png" />
</p>

## Available markets
1. Carbon credits
2. Ice Melting
3. Coffee production


## Development Instructions

1. Run `yarn install`
2. In a separate terminal, run `ganache-cli -d`
3. Run `npm run migrate`
4. Start the dev server with `npm start`

It will generate a build folder inside the root with the styles, JS assets and contracts.


## Environnement variables

`.env` and `.env.production` can overwrite environnement variables such as networkID for deployment etc.

## LMSRMarketMaker

Contract address is saved into `src/build/contracts/Migrations.json`:

```
"networks": {
  "1565085406360": {
    "events": {},
    "links": {},
    "address": "0x25D02115bd67258a406A0F676147E6C3598a91a9",
    "transactionHash": "0x72f6947c4761641d52107669fea416056b95a74d216cd1065c7acd74366b9a5a"
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
