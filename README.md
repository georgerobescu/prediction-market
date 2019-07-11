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

### Working Product

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
