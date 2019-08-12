import * as types from './contractFieldKeys-types';

export const addChainlinkEcoTreeKey = (chainlinkEcoTreeKey: string) => (
  {
    chainlinkEcoTreeKey,
    type: types.ADD_CHAINLINK_ECO_TREE_KEY
  }
);
