import * as types from "../actions/positionCreation-types";

const INITIAL_STATE = {
  openMarketIndex: -1,
  newlyCreatedTxn: null,
  openInfoIndex: -1,
  openInfoData: null
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
    case types.SET_OPEN_INFO_INDEX:
      return {
        ...state,
        openInfoIndex: action.openInfoIndex
      };
    case types.SET_OPEN_INFO_DATA:
      return {
        ...state,
        openInfoData: action.openInfoData
      };
    default:
      return state;
  }
}
