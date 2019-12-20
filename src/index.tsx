import React from "react";
import { render } from "react-dom";
import { Provider, ReactReduxContext } from "react-redux";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import configureStore, { history } from "./store";
import DisplayIfWeb3Loaded from './containers/DisplayIfWeb3Loaded';

// Import contracts
import LMSRMarketMaker from './build/contracts/LMSRMarketMaker.json';

import {/*Drizzle, */generateStore } from "drizzle";
import { DrizzleContext, DrizzleProvider } from "drizzle-react";

import ChainlinkEcoTree from './build-ecotree/contracts/ChainlinkEcoTree.json';
import DaiStandin from './build/contracts/DaiStandin.json';
import SumValueMintedAssetsOracle from './build/contracts/SumValueMintedAssetsOracle.json';

export const store = configureStore();

// const drizzle_options = {
//   contracts: [
//     LMSRMarketMaker
//   ]
// };

//define drizzle options
const options = {
  contracts: [ChainlinkEcoTree, DaiStandin, SumValueMintedAssetsOracle]
};

//initialise drizzle store with options
// const drizzleStore = generateStore(options);
//initialise drizzle object, passing options and store
// const drizzleProp = new Drizzle(options, store);

const RootComponent = () => (
  <>
    {ReactReduxContext && <DrizzleProvider store={store} options={options} context={ReactReduxContext}>
      <DisplayIfWeb3Loaded context={ReactReduxContext}>
        <App context={ReactReduxContext} {...(history ? { history } : { })} />
      </DisplayIfWeb3Loaded>
    </DrizzleProvider>}
    {!ReactReduxContext && <div>Loading...</div>}
  </>
);

const rootElement = document.getElementById("root");
render(<RootComponent />, rootElement);

registerServiceWorker();
