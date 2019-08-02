import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import configureStore, { history } from "./store";
import DisplayIfWeb3Loaded from './containers/DisplayIfWeb3Loaded';

// Import contracts
import LMSRMarketMaker from './build/contracts/LMSRMarketMaker.json';

const drizzle = require('drizzle-react');
const DrizzleProvider = drizzle.DrizzleProvider;

export const store = configureStore();

const drizzle_options = {
  contracts: [
    LMSRMarketMaker
  ]
};

const RootComponent = () => (
  <DrizzleProvider options={drizzle_options}>
    <Provider store={store}>
      <DisplayIfWeb3Loaded>
        <App {...(history ? { history } : {})} />
      </DisplayIfWeb3Loaded>
    </Provider>
  </DrizzleProvider>
);

const rootElement = document.getElementById("root");
render(<RootComponent />, rootElement);

registerServiceWorker();
