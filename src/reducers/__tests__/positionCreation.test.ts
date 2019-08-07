import positionCreation from '../positionCreation';
import * as types from '../../actions/positionCreation-types';

describe('positionCreation reducer', () => {
  it('should set openMarketIndex field', () => {
    // Check default value
    expect(positionCreation(undefined, {type: null})).toHaveProperty('openMarketIndex', -1);
    // Check with custom value
    expect(positionCreation(null, {type: types.SET_OPEN_MARKET_INDEX, openMarketIndex: 7})).toHaveProperty('openMarketIndex', 7);
  });
  it('should set newlyCreatedTxn field', () => {
    // Check default value
    expect(positionCreation(undefined, {type: null})).toHaveProperty('newlyCreatedTxn', null);
    // Check with custom value
    expect(positionCreation(null, {type: types.SET_NEWLY_CREATED_TXN, newlyCreatedTxn: '0xtxnhash'})).toHaveProperty('newlyCreatedTxn', '0xtxnhash');
  });
});
