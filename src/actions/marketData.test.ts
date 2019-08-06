import * as actions from './marketData';
import * as types from './marketData-types';

describe('marketData actions', () => {
  it('should set account field', () => {
    const expectedAction = {
      account: '0x0',
      type: types.SET_ACCOUNT
    };
    expect(actions.setAccount('0x0')).toEqual(expectedAction);
  });
  it('should set collateral field', () => {
    const expectedAction = {
      collateral: {address: "0x0", contract: "0x0"},
      type: types.SET_COLLATERAL
    };
    expect(actions.setCollateral({address: "0x0", contract: "0x0"})).toEqual(expectedAction);
  });
  it('should set collateralBalance field', () => {
    const expectedAction = {
      collateralBalance: 101,
      type: types.SET_COLLATERAL_BALANCE
    };
    expect(actions.setCollateralBalance(101)).toEqual(expectedAction);
  });
  it('should set loading field', () => {
    const expectedAction = {
      loading: true,
      type: types.SET_LOADING
    };
    expect(actions.setLoading(true)).toEqual(expectedAction);
  });
  it('should set LMSRState field', () => {
    const expectedAction = {
      LMSRState: {owner: '0x0', fee: 100},
      type: types.SET_LMSR_STATE
    };
    expect(actions.setLMSRState({owner: '0x0', fee: 100})).toEqual(expectedAction);
  });
  it('should set LMSRAllowance field', () => {
    const expectedAction = {
      LMSRAllowance: 10000,
      type: types.SET_LMSR_ALLOWANCE
    };
    expect(actions.setLMSRAllowance(10000)).toEqual(expectedAction);
  });
  it('should set LMSRMarketMaker field', () => {
    const expectedAction = {
      LMSRMarketMaker: {variousContractProperties: true},
      type: types.SET_LMSR_MARKET_MAKER
    };
    expect(actions.setLMSRMarketMaker({variousContractProperties: true})).toEqual(expectedAction);
  });
  it('should set markets field', () => {
    const expectedAction = {
      markets: [{"title": "title","resolutionDate": "2021","outcomes": [{"title": "Yes","short": "Yes","when": "Today"}],"oracle": "FCLA","icon": "tree.jpg"}],
      type: types.SET_MARKETS
    };
    expect(actions.setMarkets([{"title": "title","resolutionDate": "2021","outcomes": [{"title": "Yes","short": "Yes","when": "Today"}],"oracle": "FCLA","icon": "tree.jpg"}])).toEqual(expectedAction);
  });
  it('should set marketResolutionStates field', () => {
    const expectedAction = {
      marketResolutionStates: ["yes", "no"],
      type: types.SET_MARKET_RESOLUTION_STATES
    };
    expect(actions.setMarketResolutionStates(["yes", "no"])).toEqual(expectedAction);
  });
  it('should set marketSelections field', () => {
    const expectedAction = {
      marketSelections: {variousProperties: 123},
      type: types.SET_MARKET_SELECTIONS
    };
    expect(actions.setMarketSelections({variousProperties: 123})).toEqual(expectedAction);
  });
  it('should set networkId field', () => {
    const expectedAction = {
      networkId: 1000001,
      type: types.SET_NETWORK_ID
    };
    expect(actions.setNetworkId(1000001)).toEqual(expectedAction);
  });
  it('should set ongoingTransactionType field', () => {
    const expectedAction = {
      ongoingTransactionType: 'transaction-type',
      type: types.SET_ONGOING_TRANSACTION_TYPE
    };
    expect(actions.setOngoingTransactionType('transaction-type')).toEqual(expectedAction);
  });
  it('should set PMSystem field', () => {
    const expectedAction = {
      PMSystem: 'sysname',
      type: types.SET_PM_SYSTEM
    };
    expect(actions.setPMSystem('sysname')).toEqual(expectedAction);
  });
  it('should set positions field', () => {
    const expectedAction = {
      positions: [{positionProperties: 'string'}],
      type: types.SET_POSITIONS
    };
    expect(actions.setPositions([{positionProperties: 'string'}])).toEqual(expectedAction);
  });
  it('should set positionBalances field', () => {
    const expectedAction = {
      positionBalances: {'positionKey': 100},
      type: types.SET_POSITION_BALANCES
    };
    expect(actions.setPositionBalances({'positionKey': 100})).toEqual(expectedAction);
  });
  it('should set stagedTradeAmounts field', () => {
    const expectedAction = {
      stagedTradeAmounts: {'tradeKey': 10},
      type: types.SET_STAGED_TRADE_AMOUNTS
    };
    expect(actions.setStagedTradeAmounts({'tradeKey': 10})).toEqual(expectedAction);
  });
  it('should set stagedTransactionType field', () => {
    const expectedAction = {
      stagedTransactionType: 'transaction-type',
      type: types.SET_STAGED_TRANSACTION_TYPE
    };
    expect(actions.setStagedTransactionType('transaction-type')).toEqual(expectedAction);
  });
  it('should set syncTime field', () => {
    const expectedAction = {
      syncTime: 15,
      type: types.SET_SYNC_TIME
    };
    expect(actions.setSyncTime(15)).toEqual(expectedAction);
  });
  it('should set web3 field', () => {
    const expectedAction = {
      web3: {largeObject: {manySubProperties: 'morethings'}},
      type: types.SET_WEB3
    };
    expect(actions.setWeb3({largeObject: {manySubProperties: 'morethings'}})).toEqual(expectedAction);
  });
});
