import React from "react";
import PropTypes from "prop-types";
import web3 from "web3";
import { bindActionCreators } from "redux";
import * as marketCreationActions from "../actions/marketCreation";
import { drizzleConnect } from "drizzle-react";

const ForestData = ({
  title,
  setOpenCreationIndex,
  forestIndex,
  icon,
  ChainlinkEcoTreeContract,
  chainlinkEcoTreeKeys
}) => {
  return (
    <>
      <div className="row mt-4">
        <div className="offset-lg-3 offset-md-2 col-lg-6 col-md-8 col-sm-12">
          <div className="jr-card p-0 jr-card-full-height border-0">
            <div className="jr-card-body ">
              <ul className="overflow-hidden list-group">
                <li className="d-flex align-items-center list-group-item border-0">
                  <span className="mr-3">
                    <img
                      className="market-avatar size-50"
                      alt="Market Icon"
                      src={icon}
                    ></img>
                  </span>
                  <p className="br-break mb-0 list-group-item-text">{title}</p>
                </li>
                <li>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="chart-header">
                        <span className="d-block mb-1 text-muted">
                          Forest ID:{" "}
                          {web3.utils.toAscii(
                            ChainlinkEcoTreeContract.forests[
                              chainlinkEcoTreeKeys[forestIndex]
                            ].value.id
                          )}
                        </span>
                        <span className="d-block mb-1 text-muted">
                          Emissions ID:{" "}
                          {web3.utils.toAscii(
                            ChainlinkEcoTreeContract.forests[
                              chainlinkEcoTreeKeys[forestIndex]
                            ].value.essence_id
                          )}
                        </span>
                        <span className="d-block mb-1 text-muted">
                          Parcel ID:{" "}
                          {web3.utils.toAscii(
                            ChainlinkEcoTreeContract.forests[
                              chainlinkEcoTreeKeys[forestIndex]
                            ].value.parcelle_id
                          )}
                        </span>
                        <span className="d-block mb-1 text-muted">
                          Date Planted:{" "}
                          {web3.utils.toAscii(
                            ChainlinkEcoTreeContract.forests[
                              chainlinkEcoTreeKeys[forestIndex]
                            ].value.date_plantation
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="stack-order  py-4 px-2">
                        <button
                          className="jr-btn jr-btn-secondary text-uppercase btn-block btn btn-default"
                          onClick={() => setOpenCreationIndex(forestIndex)}
                        >
                          <span>Create Market</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ForestData.propTypes = {
  title: PropTypes.string.isRequired,
  setOpenCreationIndex: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  forestIndex: PropTypes.number.isRequired,
  ChainlinkEcoTreeContract: PropTypes.any.isRequired,
  chainlinkEcoTreeKeys: PropTypes.any.isRequired
};

export default drizzleConnect(
  ForestData,
  // @ts-ignore
  state => ({
    // @ts-ignore
    ChainlinkEcoTreeContract: state.contracts.ChainlinkEcoTree,
    // @ts-ignore
    chainlinkEcoTreeKeys: state.contractFieldKeys.chainlinkEcoTreeKeys
  }),
  dispatch => ({
    setOpenCreationIndex: bindActionCreators(
      marketCreationActions.setOpenCreationIndex,
      dispatch
    )
  })
);
