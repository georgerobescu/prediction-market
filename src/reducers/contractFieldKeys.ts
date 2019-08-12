import * as types from '../actions/contractFieldKeys-types';

const INITIAL_STATE = {
  chainlinkEcoTreeKeys: []
};

export default function contractFieldKeys(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.ADD_CHAINLINK_ECO_TREE_KEY:
      return {
        ...state,
        chainlinkEcoTreeKeys: [
          ...(state.chainlinkEcoTreeKeys),
          action.chainlinkEcoTreeKey
        ]
      };
    default:
      return state;
  }
};
