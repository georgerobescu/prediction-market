import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import marketDataReducer from "./marketData";
import positionCreationReducer from "./positionCreation";
import Web3Reducer from "./web3Reducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    marketData: marketDataReducer,
    positionCreation: positionCreationReducer,
    web3: Web3Reducer
  });
