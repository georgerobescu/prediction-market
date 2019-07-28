import * as actions from './web3Actions';
import * as types from './web3Actions-types';

describe('web3Actions actions', () => {
  it('should set isAnyUnlockedAccount field', () => {
    const expectedAction = {
      isAnyUnlockedAccount: true,
      type: types.SET_IS_ANY_UNLOCKED_ACCOUNT
    };
    expect(actions.setIsAnyUnlockedAccount(true)).toEqual(expectedAction);
  });
  it('should set networkName field', () => {
    const expectedAction = {
      networkName: "network_name",
      type: types.SET_NETWORK_NAME
    };
    expect(actions.setNetworkName("network_name")).toEqual(expectedAction);
  });
  it('should set web3Status field', () => {
    const expectedAction = {
      web3Status: "web3-status",
      type: types.SET_WEB3_STATUS
    };
    expect(actions.setWeb3Status("web3-status")).toEqual(expectedAction);
  });
});