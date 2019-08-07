import * as actions from '../positionCreation';
import * as types from '../positionCreation-types';

describe('positionCreation actions', () => {
  it('should set openMarketIndex field', () => {
    const expectedAction = {
      openMarketIndex: 10,
      type: types.SET_OPEN_MARKET_INDEX
    };
    expect(actions.setOpenMarketIndex(10)).toEqual(expectedAction);
  });
  it('should set newlyCreatedTxn field', () => {
    const expectedAction = {
      newlyCreatedTxn: "txn-hash",
      type: types.SET_NEWLY_CREATED_TXN
    };
    expect(actions.setNewlyCreatedTxn("txn-hash")).toEqual(expectedAction);
  });
});
