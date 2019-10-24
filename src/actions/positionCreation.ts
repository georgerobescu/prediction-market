import * as types from "./positionCreation-types";

export const setOpenMarketIndex = openMarketIndex => ({
  openMarketIndex,
  type: types.SET_OPEN_MARKET_INDEX
});

export const setNewlyCreatedTxn = newlyCreatedTxn => ({
  newlyCreatedTxn,
  type: types.SET_NEWLY_CREATED_TXN
});

export const setOpenInfoIndex = openInfoIndex => ({
  openInfoIndex,
  type: types.SET_OPEN_INFO_INDEX
});

export const setOpenInfoData = openInfoData => ({
  openInfoData,
  type: types.SET_OPEN_INFO_DATA
});
