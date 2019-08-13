import * as types from "../actions/marketCreation-types";

const INITIAL_STATE = {
  openCreationIndex: -1
};

export default function marketCreation(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_OPEN_CREATION_INDEX:
      return {
        ...state,
        openCreationIndex: action.openCreationIndex
      };
    default:
      return state;
  }
}
