import marketData from './marketData';
import * as types from '../actions/marketData-types';

describe('marketData reducer', () => {
  it('should set account field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('account', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_ACCOUNT, account: '0x0'})).toHaveProperty('account', '0x0');
  });
  it('should set collateral field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('collateral', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_COLLATERAL, collateral: {address: "0x0", contract: "0x0"}})).toHaveProperty('collateral', {address: "0x0", contract: "0x0"});
  });
  it('should set collateralBalance field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('collateralBalance', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_COLLATERAL_BALANCE, collateralBalance: 101})).toHaveProperty('collateralBalance', 101);
  });
  it('should set loading field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('loading', "LOADING");
    // Check with custom value
    expect(marketData(null, {type: types.SET_LOADING, loading: "LOADED"})).toHaveProperty('loading', "LOADED");
  });
  it('should set LMSRState field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('LMSRState', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_LMSR_STATE, LMSRState: "0x0"})).toHaveProperty('LMSRState', "0x0");
  });
  it('should set LMSRAllowance field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('LMSRAllowance', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_LMSR_ALLOWANCE, LMSRAllowance: 10000})).toHaveProperty('LMSRAllowance', 10000);
  });
  it('should set LMSRMarketMaker field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('LMSRMarketMaker', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_LMSR_MARKET_MAKER, LMSRMarketMaker: {variousContractProperties: true}})).toHaveProperty('LMSRMarketMaker', {variousContractProperties: true});
  });
  it('should set markets field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('markets', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_MARKETS, markets: [{"title": "title","resolutionDate": "2021","outcomes": [{"title": "Yes","short": "Yes","when": "Today"}],"oracle": "FCLA","icon": "tree.jpg"}]})).toHaveProperty('markets', [{"title": "title","resolutionDate": "2021","outcomes": [{"title": "Yes","short": "Yes","when": "Today"}],"oracle": "FCLA","icon": "tree.jpg"}]);
  });
  it('should set marketResolutionStates field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('marketResolutionStates', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_MARKET_RESOLUTION_STATES, marketResolutionStates: ["yes", "no"]})).toHaveProperty('marketResolutionStates', ["yes", "no"]);
  });
  it('should set marketSelections field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('marketSelections', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_MARKET_SELECTIONS, marketSelections: {variousProperties: 123}})).toHaveProperty('marketSelections', {variousProperties: 123});
  });
  it('should set networkId field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('networkId', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_NETWORK_ID, networkId: 1000001})).toHaveProperty('networkId', 1000001);
  });
  it('should set ongoingTransactionType field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('ongoingTransactionType', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_ONGOING_TRANSACTION_TYPE, ongoingTransactionType: 'transaction-type'})).toHaveProperty('ongoingTransactionType', 'transaction-type');
  });
  it('should set PMSystem field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('PMSystem', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_PM_SYSTEM, PMSystem: 'sysname'})).toHaveProperty('PMSystem', 'sysname');
  });
  it('should set positions field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('positions', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_POSITIONS, positions: [{positionProperties: 'string'}]})).toHaveProperty('positions', [{positionProperties: 'string'}]);
  });
  it('should set positionBalances field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('positionBalances', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_POSITION_BALANCES, positionBalances: {'positionKey': 100}})).toHaveProperty('positionBalances', {'positionKey': 100});
  });
  it('should set stagedTradeAmounts field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('stagedTradeAmounts', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_STAGED_TRADE_AMOUNTS, stagedTradeAmounts: {'tradeKey': 10}})).toHaveProperty('stagedTradeAmounts', {'tradeKey': 10});
  });
  it('should set stagedTransactionType field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('stagedTransactionType', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_STAGED_TRANSACTION_TYPE, stagedTransactionType: 'transaction-type'})).toHaveProperty('stagedTransactionType', 'transaction-type');
  });
  it('should set syncTime field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('syncTime', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_SYNC_TIME, syncTime: 15})).toHaveProperty('syncTime', 15);
  });
  it('should set web3 field', () => {
    // Check default value
    expect(marketData(undefined, {type: null})).toHaveProperty('web3', null);
    // Check with custom value
    expect(marketData(null, {type: types.SET_WEB3, web3: {largeObject: {manySubProperties: 'morethings'}}})).toHaveProperty('web3', {largeObject: {manySubProperties: 'morethings'}});
  });
});
