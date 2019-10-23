import * as types from './web3Actions-types';

export const setIsAnyUnlockedAccount = (isAnyUnlockedAccount: boolean) => (
  {
    isAnyUnlockedAccount,
    type: types.SET_IS_ANY_UNLOCKED_ACCOUNT
  }
);

export const setNetworkName = (networkName: string) => (
  {
    networkName,
    type: types.SET_NETWORK_NAME
  }
);

export const setWeb3Status = (web3Status: string) => (
  {
    web3Status,
    type: types.SET_WEB3_STATUS
  }
);

export const setLoadingAttempted = (loadingAttempted: boolean) => (
  {
    loadingAttempted,
    type: types.SET_LOADING_ATTEMPTED
  }
);
