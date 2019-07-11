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
        <div className="col-lg-2 col-md-2 col-sm-6">
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
              <i className="zmdi zmdi-calendar-check text-muted chart-f20"></i>
              Oracles: {oracle}
            </span>
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
        <div className="col-lg-2 col-md-2 col-sm-6">
          <div className="">
            <div className="stack-order  py-4 px-2">
              {marketStage !== "Closed" && (
                <button
                  className="jr-btn jr-btn-secondary text-uppercase btn-block btn btn-default"
                  onClick={() => setOpenMarketIndex(marketIndex)}
                >
                  <span>Trade</span>
                </button>
              )}
            </div>
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
