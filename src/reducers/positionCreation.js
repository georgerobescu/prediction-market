import * as types from "../actions/positionCreation-types";

const INITIAL_STATE = {
  openMarketIndex: -1,
  newlyCreatedTxn: null
};

export default function positionCreation(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_OPEN_MARKET_INDEX:
      return {
        ...state,
        openMarketIndex: action.openMarketIndex
      };
    case types.SET_NEWLY_CREATED_TXN:
      return {
        ...state,
        newlyCreatedTxn: action.newlyCreatedTxn
      };
    default:
      return state;
  }
}
