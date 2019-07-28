import web3Reducer from './web3Reducer';
import * as types from '../actions/web3Actions-types';

describe('web3Reducer reducer', () => {
  it('should set isAnyUnlockedAccount field', () => {
    // Check default value
    expect(web3Reducer(undefined, {type: null})).toHaveProperty('isAnyUnlockedAccount', false);
    // Check with custom value
    expect(web3Reducer(null, {type: types.SET_IS_ANY_UNLOCKED_ACCOUNT, isAnyUnlockedAccount: true})).toHaveProperty('isAnyUnlockedAccount', true);
  });
  it('should set networkName field', () => {
    // Check default value
    expect(web3Reducer(undefined, {type: null})).toHaveProperty('networkName', '');
    // Check with custom value
    expect(web3Reducer(null, {type: types.SET_NETWORK_NAME, networkName: 'net-name'})).toHaveProperty('networkName', 'net-name');
  });
  it('should set web3Status field', () => {
    // Check default value
    expect(web3Reducer(undefined, {type: null})).toHaveProperty('web3Status', '');
    // Check with custom value
    expect(web3Reducer(null, {type: types.SET_WEB3_STATUS, web3Status: 'connected!'})).toHaveProperty('web3Status', 'connected!');
  });
});
