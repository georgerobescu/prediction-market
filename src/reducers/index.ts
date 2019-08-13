import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import marketDataReducer from "./marketData";
import positionCreationReducer from "./positionCreation";
import web3Reducer from "./web3Reducer";
import contractFieldKeys from "./contractFieldKeys";
import marketCreation from "./marketCreation";

// export default history =>
//   combineReducers({
//     router: connectRouter(history),
//     marketData: marketDataReducer,
//     positionCreation: positionCreationReducer,
//     web3: web3Reducer
//   });

export default history => ({
  marketData: marketDataReducer,
  positionCreation: positionCreationReducer,
  web3Reducer,
  contractFieldKeys,
  marketCreation,
  ...(
    history
    && { router: connectRouter(history) }
  )
});
