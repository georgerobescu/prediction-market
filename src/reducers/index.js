import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import marketDataReducer from "./marketData";
import positionCreationReducer from "./positionCreation";

export default history =>
  combineReducers({
    router: connectRouter(history),
    marketData: marketDataReducer,
    positionCreation: positionCreationReducer
  });
