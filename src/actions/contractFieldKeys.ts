import * as types from './contractFieldKeys-types';

export const setOracleReportedValueLocationKey = (oracleReportedKey: string, oracleReportedValueLocationKey: number) => (
  {
  	oracleReportedKey,
    oracleReportedValueLocationKey,
    type: types.SET_ORACLE_REPORTED_VALUE_LOCATION_KEY
  }
);
