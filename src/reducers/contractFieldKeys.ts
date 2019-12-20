import * as types from '../actions/contractFieldKeys-types';

const INITIAL_STATE = {
  oracleReportedValueLocationKeys: {}
};

export default function contractFieldKeys(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_ORACLE_REPORTED_VALUE_LOCATION_KEY:
      return {
        ...state,
        oracleReportedValueLocationKeys: {
          ...(state.oracleReportedValueLocationKeys),
          [action.oracleReportedKey]: action.oracleReportedValueLocationKey
        }
      };
    default:
      return state;
  }
};
