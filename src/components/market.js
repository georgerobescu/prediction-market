import React from "react";
import PropTypes from "prop-types";
import Web3 from "web3";
import Decimal from "decimal.js-light";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import OutcomesBinary from "./outcomes-binary";
import Spinner from "./spinner";
import { formatProbability } from "../utils/formatting";
import * as positionCreationActions from "../actions/positionCreation";

const { BN } = Web3.utils;

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
  oracle,
  lastMarketListed,
  icon
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

  return (
    <>
      <div className="row mt-4">
        <div className="offset-lg-2 offset-md-1 col-lg-4 col-md-6 col-sm-12">
          <div className="jr-card p-0 jr-card-full-height">
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
              </ul>
            </div>
          </div>
        </div>
        <div className="card jr-chart-or jr-card-full-height d-flex flex-column justify-content-between border-0">
          <div className="chart-header">
            <div className="sub-heading">Details</div>
            <span className="d-block mb-1 text-muted">
              Probability:{" "}
              {probabilities == null ? (
                <Spinner width={25} height={25} />
              ) : (
                formatProbability(probabilities[0])
              )}
            </span>
            <span className="d-block mb-1 text-muted">
              <i className="zmdi zmdi-calendar-check text-muted chart-f20"></i>
              Oracles: {oracle}
            </span>
          </div>
          <div className="recharts-responsive-container">
            <div
              className="recharts-wrapper"
              style={{
                position: "relative",
                cursor: "default",
                width: "183px",
                height: "62px"
              }}
            ></div>
            <svg
              className="recharts-surface"
              width="183"
              height="62"
              viewBox="0 0 183 62"
              version="1.1"
            >
              <g className="recharts-layer recharts-line">
                <path
                  stroke="#3f51b5"
                  fillOpacity="0.8"
                  strokeWidth="1"
                  fill="none"
                  width="173"
                  height="52"
                  strokeDasharray="215.88543701171875px 0px"
                  className="recharts-curve recharts-line-curve"
                  d="M5,31C14.611111111111109,24.5,24.22222222222222,18,33.83333333333333,18C43.44444444444444,18,53.05555555555555,37.5,62.666666666666664,37.5C72.27777777777777,37.5,81.88888888888889,24.5,91.5,24.5C101.11111111111111,24.5,110.72222222222221,44,120.33333333333333,44C129.94444444444443,44,139.55555555555554,11.5,149.16666666666666,11.5C158.77777777777777,11.5,168.38888888888889,21.25,178,31"
                ></path>
                <g className="recharts-layer recharts-line-dots">
                  <circle
                    r="3"
                    stroke="#3f51b5"
                    fillOpacity="0.8"
                    strokeWidth="1"
                    fill="#fff"
                    width="173"
                    height="52"
                    className="recharts-dot recharts-line-dot"
                    cx="5"
                    cy="31"
                  ></circle>
                  <circle
                    r="3"
                    stroke="#3f51b5"
                    fillOpacity="0.8"
                    strokeWidth="1"
                    fill="#fff"
                    width="173"
                    height="52"
                    className="recharts-dot recharts-line-dot"
                    cx="33.83333333333333"
                    cy="18"
                  ></circle>
                  <circle
                    r="3"
                    stroke="#3f51b5"
                    fillOpacity="0.8"
                    strokeWidth="1"
                    fill="#fff"
                    width="173"
                    height="52"
                    className="recharts-dot recharts-line-dot"
                    cx="62.666666666666664"
                    cy="37.5"
                  ></circle>
                  <circle
                    r="3"
                    stroke="#3f51b5"
                    fillOpacity="0.8"
                    strokeWidth="1"
                    fill="#fff"
                    width="173"
                    height="52"
                    className="recharts-dot recharts-line-dot"
                    cx="91.5"
                    cy="24.5"
                  ></circle>
                  <circle
                    r="3"
                    stroke="#3f51b5"
                    fillOpacity="0.8"
                    strokeWidth="1"
                    fill="#fff"
                    width="173"
                    height="52"
                    className="recharts-dot recharts-line-dot"
                    cx="120.33333333333333"
                    cy="44"
                  ></circle>
                  <circle
                    r="3"
                    stroke="#3f51b5"
                    fillOpacity="0.8"
                    strokeWidth="1"
                    fill="#fff"
                    width="173"
                    height="52"
                    className="recharts-dot recharts-line-dot"
                    cx="149.16666666666666"
                    cy="11.5"
                  ></circle>
                  <circle
                    r="3"
                    stroke="#3f51b5"
                    fillOpacity="0.8"
                    strokeWidth="1"
                    fill="#fff"
                    width="173"
                    height="52"
                    className="recharts-dot recharts-line-dot"
                    cx="178"
                    cy="31"
                  ></circle>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-12 col-sm-6">
          <div className="card text-center border-0">
            <div className="stack-order  py-4 px-2">
              {marketStage !== "Closed" && (
                <button
                  className="jr-btn jr-btn-secondary text-uppercase btn-block btn btn-default"
                  onClick={() => setOpenMarketIndex(marketIndex)}
                >
                  <span>Trade</span>
                </button>
              )}
              {isResolved ? (
                <span className="h3 text-muted">
                  <span>
                    eported Outcome:{" "}
                    {resultOutcomeIndex != null
                      ? outcomes[resultOutcomeIndex].title
                      : "Mixed"}
                  </span>
                </span>
              ) : (
                <span className="h6 text-muted">
                  <span>
                    Resolves: {new Date(resolutionDate).toLocaleString()}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {!lastMarketListed && (
        <div className="col-12 jr-card p-0 border-bottom-0 m-0" />
      )}
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
    payoutNumerators: PropTypes.arrayOf(PropTypes.instanceOf(BN).isRequired)
  }),
  probabilities: PropTypes.arrayOf(PropTypes.instanceOf(Decimal)),
  marketIndex: PropTypes.number.isRequired,
  setOpenMarketIndex: PropTypes.func.isRequired,
  stagedProbabilities: PropTypes.arrayOf(
    PropTypes.instanceOf(Decimal).isRequired
  ),
  oracle: PropTypes.string.isRequired,
  lastMarketListed: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired
};

Market.defaultProps = {
  selectedOutcomes: {}
};

export default connect(
  // @ts-ignore
  null,
  dispatch => ({
    setOpenMarketIndex: bindActionCreators(
      positionCreationActions.setOpenMarketIndex,
      dispatch
    )
  })
)(Market);
