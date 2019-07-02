import * as types from "../actions/positionCreation-types";

const INITIAL_STATE = {
  openMarketIndex: -1
};

export default function positionCreation(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_OPEN_MARKET_INDEX:
      return {
        ...state,
        openMarketIndex: action.openMarketIndex
      };
    default:
      return state;
  }
}
