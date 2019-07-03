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
    <>
      <div className="row mt-4">
        <div className="col-lg-8 col-md-8 col-12 col-sm-12">
          <div className="jr-card p-0 jr-card-full-height">
            <div className="jr-card-body ">
              <ul className="overflow-hidden list-group">
                <li className="d-flex align-items-center list-group-item-action list-group-item border-0">
                  <span className="mr-3">
                    <img
                      className="user-avatar size-50"
                      alt="EcoTree"
                      src="assets/images/marketImage.jpg"
                    ></img>
                  </span>
                  <p className="br-break mb-0 list-group-item-text">{title}</p>
                </li>
                <li className="d-flex align-items-center list-group-item-action list-group-item border-left-0 border-right-0 border-bottom-0">
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
        <div className="col-lg-2 col-md-2 col-12 col-sm-6">
          <div className="jr-card p-0 jr-card-full-height">
            <div className="jr-card-body ">
              <ul className="overflow-hidden list-group">
                {marketStage !== "Closed" && (
                  <li className="d-flex align-items-center list-group-item-action list-group-item border-0">
                    <div className="text-sm-center col pl-0 pr-0">
                      <button
                        className="jr-btn jr-btn-xs btn btn-primary"
                        onClick={() => setOpenMarketIndex(marketIndex)}
                      >
                        <span>Trade</span>
                      </button>
                    </div>
                  </li>
                )}
                <li className="d-flex align-items-center list-group-item-action list-group-item border-left-0 border-right-0 border-bottom-0">
                  {isResolved ? (
                    <div className="col">
                      <div className="row">Reported Outcome</div>
                      <div className="row">
                        {resultOutcomeIndex != null
                          ? outcomes[resultOutcomeIndex].title
                          : "Mixed"}
                      </div>
                    </div>
                  ) : (
                    <div className="col">
                      <div className="row">Resolves</div>
                      <div className="row">
                        {new Date(resolutionDate).toLocaleString()}
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-12 col-sm-6">
          <div className="jr-card p-0 jr-card-full-height">
            <div className="jr-card-body ">
              <ul className="overflow-hidden list-group">
                {marketStage !== "Closed" && (
                  <li className="d-flex align-items-center list-group-item-action list-group-item border-0">
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
                  </li>
                )}
                <li className="d-flex align-items-center list-group-item-action list-group-item border-left-0 border-right-0 border-bottom-0">
                  Some other shit
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 jr-card p-0 border-bottom-0 m-0" />
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
