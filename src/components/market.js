import React from "react";
import PropTypes from "prop-types";
import Decimal from "decimal.js-light";
import { bindActionCreators } from "redux";
import OutcomesBinary from "./outcomes-binary";
import Spinner from "./spinner";
import { formatProbability } from "../utils/formatting";
import * as positionCreationActions from "../actions/positionCreation";
import { drizzleConnect } from "drizzle-react";
import GoogleMap from "google-map-react";

// const { BN } = Web3.utils;

const Market = ({
  title,
  resolutionDate,
  outcomes,
  lmsrState,
  resolutionState,
  probabilities,
  stagedProbabilities,
  marketIndex,
  setOpenMarketIndex,
  setOpenInfoIndex,
  // oracle,
  lastMarketListed,
  icon,
  SumValueMintedAssetsOracleContract,
  ChainlinkEcoTreeContract,
  oracleReportedValueLocationKeys,
  polygone
}) => {
  const marketStage = lmsrState && lmsrState.stage;
  const isResolved = resolutionState && resolutionState.isResolved;

  let resultOutcomeIndex = null;
  if (isResolved) {
    resultOutcomeIndex = resolutionState.payoutNumerators.findIndex(n =>
      n.gtn(0)
    );
    if (
      resolutionState.payoutNumerators.some(
        (n, i) => resultOutcomeIndex !== i && n.gtn(0)
      )
    ) {
      // there can only be one nonzero numerator for the result outcome index to be well defined
      resultOutcomeIndex = null;
    }
  }

  let marketDataPolygonPoint;
  try {
    const pointParts = polygone
      .split("[[")[1]
      .split("]")[0]
      .split(",");
    marketDataPolygonPoint = [
      parseFloat(pointParts[0]),
      parseFloat(pointParts[1])
    ];
  } catch (e) {
    marketDataPolygonPoint = [45.294384, 3.810003];
  }

  return (
    <>
      <div className="row mt-4">
        <div className="col-sm-9">
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
                  <p className="mb-0 list-group-item-text">
                    {
                      title /*title.replace(
                      "{name}",
                      '"' +
                        Web3.utils.hexToUtf8(
                          ChainlinkEcoTreeContract.forests[
                            chainlinkEcoTreeKeys[marketIndex]
                          ].value.description
                        ) +
                        '"'
                    )*/
                    }
                  </p>
                </li>
                <li className="d-flex align-items-center list-group-item border-left-0 border-right-0 border-bottom-0">
                  {marketStage !== "Closed" && (
                    <>
                      <OutcomesBinary
                        {...{
                          outcomes,
                          probabilities,
                          stagedProbabilities
                        }}
                      />
                    </>
                  )}
                </li>
                <li>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="chart-header">
                        <span className="d-block mb-1 text-muted">
                          Probability:{" "}
                          {probabilities == null ? (
                            <Spinner width={25} height={25} />
                          ) : (
                            formatProbability(probabilities[0])
                          )}
                        </span>
                        <span className="d-block mb-1 text-muted">
                          Oracles:{" "}
                          <a
                            href="https://rinkeby.etherscan.io/address/0xCCccCb48132191636B95aBF45e32BaFbf5A77f5c"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            EcoTree
                          </a>
                        </span>
                        <span className="d-block mb-1 text-muted">
                          Current Reporting Value:{" "}
                          {
                            ChainlinkEcoTreeContract.sumPrixTtc[
                              oracleReportedValueLocationKeys[
                                "SumValueMintedAssetsOracle_current"
                              ]
                            ].value
                          }
                        </span>
                        <span className="d-block mb-1 text-muted">
                          Target Value:{" "}
                          {
                            SumValueMintedAssetsOracleContract.targetValue[
                              oracleReportedValueLocationKeys[
                                "SumValueMintedAssetsOracle_target"
                              ]
                            ].value
                          }
                        </span>
                        {/*title.includes("{name}") && (
                          <span className="d-block mb-1 text-muted">
                            {"Date Planted"}:{" "}
                            <a
                              href="#"
                              onClick={() => setOpenInfoIndex(marketIndex)}
                            >
                              {Web3.utils.hexToUtf8(
                                ChainlinkEcoTreeContract.forests[
                                  chainlinkEcoTreeKeys[marketIndex]
                                ].value.date_plantation
                              )}
                            </a>
                          </span>
                        )*/}
                        {isResolved ? (
                          <span className="d-block mb-1 text-muted">
                            Reported Outcome:{" "}
                            {resultOutcomeIndex != null
                              ? outcomes[resultOutcomeIndex].title
                              : "Mixed"}
                          </span>
                        ) : (
                          <span className="d-block mb-1 text-muted">
                            Resolves:{" "}
                            <a
                              href="https://rinkeby.etherscan.io/address/0x07cF53cD6616C49303227f62E46bC8abD4f2D1f0#internaltx"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {new Date(resolutionDate).toLocaleString()}
                            </a>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3">
                      <div className="stack-order  py-4 px-2">
                        {marketStage !== "Closed" && (
                          <button
                            className="jr-btn jr-btn-default text-uppercase btn-block btn btn-default"
                            onClick={() => setOpenInfoIndex(marketIndex)}
                          >
                            <span>Oracle Info</span>
                          </button>
                        )}
                      </div>
                    </div>
                    {!isResolved && (
                      <div className="col-lg-3 col-md-3 col-sm-3">
                        <div className="stack-order  py-4 px-2">
                          {marketStage !== "Closed" && (
                            <button
                              className="jr-btn jr-btn-default text-uppercase btn-block btn btn-default"
                              onClick={() => setOpenMarketIndex(marketIndex)}
                            >
                              <span>Trade</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="jr-card p-0 jr-card-full-height border-0">
            <GoogleMap
              apiKey={"AIzaSyCB8GPW0wUUUEWTJ83kUf467EK56WnYZcc"} // set if you need stats etc ...
              center={marketDataPolygonPoint}
              zoom={14}
            />
          </div>
        </div>
      </div>
      {!lastMarketListed && <div className="col-12 border-bottom-0 m-0" />}
    </>
  );
};

Market.propTypes = {
  title: PropTypes.string.isRequired,
  resolutionDate: PropTypes.string.isRequired,
  outcomes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  lmsrState: PropTypes.shape({
    stage: PropTypes.string.isRequired
  }),
  resolutionState: PropTypes.shape({
    isResolved: PropTypes.bool.isRequired,
    payoutNumerators: PropTypes.arrayOf(PropTypes.any.isRequired)
  }),
  probabilities: PropTypes.arrayOf(PropTypes.instanceOf(Decimal)),
  marketIndex: PropTypes.number.isRequired,
  setOpenMarketIndex: PropTypes.func.isRequired,
  setOpenInfoIndex: PropTypes.func.isRequired,
  stagedProbabilities: PropTypes.arrayOf(
    PropTypes.instanceOf(Decimal).isRequired
  ),
  // oracle: PropTypes.string.isRequired,
  lastMarketListed: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  SumValueMintedAssetsOracleContract: PropTypes.any.isRequired,
  ChainlinkEcoTreeContract: PropTypes.any.isRequired,
  oracleReportedValueLocationKeys: PropTypes.any.isRequired,
  polygone: PropTypes.string
};

Market.defaultProps = {
  selectedOutcomes: {}
};

export default drizzleConnect(
  Market,
  // @ts-ignore
  state => ({
    // @ts-ignore
    SumValueMintedAssetsOracleContract:
      state.contracts.SumValueMintedAssetsOracle,
    // @ts-ignore
    ChainlinkEcoTreeContract: state.contracts.ChainlinkEcoTree,
    // @ts-ignore
    oracleReportedValueLocationKeys:
      state.contractFieldKeys.oracleReportedValueLocationKeys
  }),
  dispatch => ({
    setOpenMarketIndex: bindActionCreators(
      positionCreationActions.setOpenMarketIndex,
      dispatch
    ),
    setOpenInfoIndex: bindActionCreators(
      positionCreationActions.setOpenInfoIndex,
      dispatch
    )
  })
);
