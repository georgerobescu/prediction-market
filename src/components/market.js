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
  setOpenMarketIndex
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
    <div className="">
      <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
        <h2 className="title mb-3 mb-sm-0">PM FCLA</h2>
      </div>
      <div className="row mb-md-6">
        <div className="col-lg-6 col-md-6 col-6 mb-md-6">
          <div className="jr-card p-0 border-0">
            <div className="jr-card-body ">
              <ul className="overflow-hidden list-group">
                <li className="d-flex align-items-center list-group-item-action list-group-item">
                  <span className="mr-3">
                    <img
                      className="user-avatar size-50"
                      alt="EcoTree"
                      src="assets/images/marketImage.jpg"
                    ></img>
                  </span>
                  <p className="br-break mb-0 list-group-item-text">{title}</p>
                </li>
              </ul>
            </div>
            {marketStage !== "Closed" && (
              <>
                <div className="">
                  <OutcomesBinary
                    {...{
                      outcomes,
                      probabilities,
                      stagedProbabilities
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-2 mb-md-2">
          <div className="jr-card p-0 border-0">
            <div className="jr-card-body ">
              <ul className="overflow-hidden list-group">
                <li className="d-flex align-items-center list-group-item-action list-group-item">
                  {marketStage !== "Closed" && (
                    <>
                      <button
                        className="jr-btn jr-btn-xs btn btn-primary"
                        onClick={() => setOpenMarketIndex(marketIndex)}
                      >
                        <span>Trade</span>
                      </button>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-4 mb-md-4">
          <div className="jr-card p-0 border-0">
            <div className="jr-card-body ">
              <ul className="overflow-hidden list-group">
                <li className="d-flex align-items-center list-group-item-action list-group-item">
                  <div className="">
                    {marketStage !== "Closed" && (
                      <div className="">
                        <h3 className="">Probability</h3>
                        <h3 className="">
                          {probabilities == null ? (
                            <Spinner width={25} height={25} />
                          ) : (
                            formatProbability(probabilities[0])
                          )}
                        </h3>
                      </div>
                    )}
                    {isResolved ? (
                      <div className="">
                        <h3 className="">Reported Outcome</h3>
                        <h3 className="">
                          {resultOutcomeIndex != null
                            ? outcomes[resultOutcomeIndex].title
                            : "Mixed"}
                        </h3>
                      </div>
                    ) : (
                      <div className="">
                        <h3 className="">Resolves</h3>
                        <h3 className="">
                          {new Date(resolutionDate).toLocaleString()}
                        </h3>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  )
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
