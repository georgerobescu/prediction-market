import * as types from '../actions/web3Actions-types';

const INITIAL_STATE = {
  isAnyUnlockedAccount: false,
  networkName: '',
  web3Status: '',
  loadingAttempted: false
};

export default function web3(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_IS_ANY_UNLOCKED_ACCOUNT:
      return {
        ...state,
        isAnyUnlockedAccount: action.isAnyUnlockedAccount
      };
    case types.SET_NETWORK_NAME:
      return {
        ...state,
        networkName: action.networkName
      };
    case types.SET_WEB3_STATUS:
      return {
        ...state,
        web3Status: action.web3Status
      };
    case types.SET_LOADING_ATTEMPTED:
      return {
        ...state,
        loadingAttempted: action.loadingAttempted
      };
    default:
      return state;
  }
};
