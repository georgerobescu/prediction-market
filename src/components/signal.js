import React from "react";
import PropTypes from "prop-types";
import Web3 from "web3";
import Decimal from "decimal.js-light";
import { bindActionCreators } from "redux";
// import OutcomesBinary from "./outcomes-binary";
// import Spinner from "./spinner";
// import { formatProbability } from "../utils/formatting";
import * as positionCreationActions from "../actions/positionCreation";
import { drizzleConnect } from "drizzle-react";

const { BN } = Web3.utils;

const Market = ({
  title,
  // resolutionDate,
  // outcomes,
  // lmsrState,
  // resolutionState,
  // probabilities,
  // stagedProbabilities,
  // marketIndex,
  setOpenMarketIndex,
  // oracle,
  tokenStaked,
  support,
  lastMarketListed,
  icon
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
                <li className="d-flex align-items-center list-group-item border-left-0 border-right-0 border-bottom-0">
                  {/*marketStage !== "Closed" && (
                    <>
                      <OutcomesBinary
                        {...{
                          outcomes,
                          probabilities,
                          stagedProbabilities
                        }}
                      />
                    </>
                  )*/}
                </li>
                <li>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="chart-header">
                        <span className="d-block mb-1 text-muted">
                          Popularity:{" " + support}%
                        </span>
                        <span className="d-block mb-1 text-muted">
                          <i className="zmdi zmdi-calendar-check text-muted chart-f20"></i>
                          Token Staked: {tokenStaked} DAI
                        </span>
                        {/*isResolved ? (
                          <span className="h3 text-muted">
                            <span>
                              eported Outcome:{" "}stuff
                            </span>
                          </span>
                        ) : (
                          <span className="h6 text-muted">
                            <span>
                              Resolves:{" "}stuff
                            </span>
                          </span>
                        )*/}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="stack-order  py-4 px-2">
                        <button
                          className="jr-btn jr-btn-secondary text-uppercase btn-block btn btn-default"
                          onClick={() => setOpenMarketIndex(101)}
                        >
                          <span>Signal</span>
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
  tokenStaked: PropTypes.number.isRequired,
  support: PropTypes.number.isRequired,
  lastMarketListed: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired
};

Market.defaultProps = {
  selectedOutcomes: {}
};

export default drizzleConnect(
  Market,
  // @ts-ignore
  null,
  dispatch => ({
    setOpenMarketIndex: bindActionCreators(
      positionCreationActions.setOpenMarketIndex,
      dispatch
    )
  })
);