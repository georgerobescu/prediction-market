import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Web3 from "web3";
import Decimal from "decimal.js-light";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as marketDataActions from "../actions/marketData";
import PositionGroupDetails from "./position-group-details";
import Spinner from "./spinner";
import { zeroDecimal } from "../utils/constants";
import { formatCollateral } from "../utils/formatting";
import { calcPositionGroups } from "../utils/position-groups";

import cn from "classnames";

const { BN, toBN, padLeft, soliditySha3, toHex } = Web3.utils;

function calcNetCost({ funding, positionBalances }, tradeAmounts) {
  const invB = new Decimal(positionBalances.length)
    .ln()
    .dividedBy(funding.toString());
  return tradeAmounts
    .reduce(
      (acc, tradeAmount, i) =>
        acc.add(
          tradeAmount
            .sub(positionBalances[i].toString())
            .mul(invB)
            .exp()
        ),
      zeroDecimal
    )
    .ln()
    .div(invB);
}

const YourPositions = ({
  account,
  PMSystem,
  markets,
  marketResolutionStates,
  positions,
  collateral,
  LMSRMarketMaker,
  LMSRState,
  positionBalances,
  stagedTradeAmounts,
  setStagedTradeAmounts,
  stagedTransactionType,
  setStagedTransactionType,
  ongoingTransactionType,
  asWrappedTransaction
}) => {
  const [positionGroups, setPositionGroups] = useState(null);

  useEffect(() => {
    if (positionBalances == null) {
      setPositionGroups(null);
    } else {
      // TODO MUST BE FIXED It looks like a Shadowed variable which could cause scope issue
      const positionGroupsShadowed = calcPositionGroups(
        markets,
        positions,
        positionBalances
      );
      setPositionGroups(positionGroupsShadowed);
    }
  }, [markets, positions, positionBalances]);

  const [salePositionGroup, setSalePositionGroup] = useState(null);

  useEffect(() => {
    if (positionGroups == null) {
      setSalePositionGroup(null);
    } else if (salePositionGroup != null) {
      setSalePositionGroup(
        positionGroups.find(
          ({ collectionId }) => collectionId === salePositionGroup.collectionId
        )
      );
    }
  }, [positionGroups, salePositionGroup]);

  const [saleAmount, setSaleAmount] = useState("");
  const [estimatedSaleEarnings, setEstimatedSaleEarnings] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (stagedTransactionType !== "sell outcome tokens") {
      return;
    }

    if (saleAmount === "") {
      setStagedTradeAmounts(null);
      setEstimatedSaleEarnings(null);
      setError(null);
      return;
    }

    try {
      const saleAmountInUnits = collateral.toUnitsMultiplier.mul(saleAmount);

      if (!saleAmountInUnits.isInteger()) {
        throw new Error(
          `Got more than ${collateral.decimals} decimals in value ${saleAmount}`
        );
      }

      if (saleAmountInUnits.gt(salePositionGroup.amount.toString())) {
        throw new Error(
          `Not enough collateral: missing ${formatCollateral(
            saleAmountInUnits.sub(salePositionGroup.amount.toString()),
            collateral
          )}`
        );
      }

      // TODO Fix stagedTradeAmounts shadowed name
      const stagedTradeAmountsInnerScope = Array.from(
        { length: positions.length },
        (_, i) =>
          salePositionGroup.positions.find(
            ({ positionIndex }) => positionIndex === i
          ) == null
            ? zeroDecimal
            : saleAmountInUnits.neg()
      );

      setStagedTradeAmounts(stagedTradeAmountsInnerScope);

      setEstimatedSaleEarnings(
        calcNetCost(LMSRState, stagedTradeAmountsInnerScope).neg()
      );

      setError(null);
    } catch (e) {
      setStagedTradeAmounts(null);
      setEstimatedSaleEarnings(null);
      setError(e);
    }
  }, [
    stagedTransactionType,
    collateral,
    positions,
    LMSRState,
    salePositionGroup,
    saleAmount,
    setStagedTradeAmounts
  ]);

  async function sellOutcomeTokens() {
    // TODO Dangerous call to stagedTradeAmounts outside scope.
    if (stagedTradeAmounts == null) {
      throw new Error(`No sell set yet`);
    }

    if (stagedTransactionType !== "sell outcome tokens") {
      throw new Error(
        `Can't sell outcome tokens while staged transaction is to ${stagedTransactionType}`
      );
    }

    if (!(await PMSystem.isApprovedForAll(account, LMSRMarketMaker.address))) {
      await PMSystem.setApprovalForAll(LMSRMarketMaker.address, true, {
        from: account
      });
    }

    const tradeAmounts = stagedTradeAmounts.map(amount => amount.toString());
    const collateralLimit = await LMSRMarketMaker.calcNetCost(tradeAmounts);

    await LMSRMarketMaker.trade(tradeAmounts, collateralLimit, {
      from: account
    });
  }

  const marketStage = LMSRState && LMSRState.stage;

  const allMarketsResolved =
    marketResolutionStates &&
    marketResolutionStates.every(({ isResolved }) => isResolved);
  const [redemptionAmount, setRedemptionAmount] = useState(null);
  useEffect(() => {
    setRedemptionAmount(
      allMarketsResolved
        ? positionBalances.reduce(
            (payoutSum, balance, positionIndex) =>
              payoutSum.add(
                positions[positionIndex].outcomes.reduce(
                  (payoutProduct, { marketIndex, outcomeIndex }) =>
                    payoutProduct
                      .mul(
                        marketResolutionStates[marketIndex].payoutNumerators[
                          outcomeIndex
                        ]
                      )
                      .div(
                        marketResolutionStates[marketIndex].payoutDenominator
                      ),
                  balance
                )
              ),
            toBN(0)
          )
        : null
    );
  }, [positions, positionBalances, marketResolutionStates, allMarketsResolved]);

  async function redeemPositions() {
    if (!allMarketsResolved) {
      throw new Error("Can't redeem until all markets resolved");
    }

    async function redeemPositionsThroughAllMarkets(
      marketsLeft,
      parentCollectionId
    ) {
      if (marketsLeft === 0) {
        return;
      }

      const market = markets[marketsLeft - 1];
      const indexSets = [];
      for (
        let outcomeIndex = 0;
        outcomeIndex < market.outcomes.length;
        outcomeIndex++
      ) {
        const outcome = market.outcomes[outcomeIndex];
        const childCollectionId = padLeft(
          toHex(
            toBN(parentCollectionId)
              .add(toBN(outcome.collectionId))
              .maskn(256)
          ),
          64
        );

        const childPositionId = soliditySha3(
          { t: "address", v: collateral.address },
          { t: "uint", v: childCollectionId }
        );

        await redeemPositionsThroughAllMarkets(
          marketsLeft - 1,
          childCollectionId
        );

        if ((await PMSystem.balanceOf(account, childPositionId)).gtn(0)) {
          indexSets.push(toBN(1).shln(outcomeIndex));
        }
      }

      if (indexSets.length > 0) {
        await PMSystem.redeemPositions(
          collateral.address,
          parentCollectionId,
          market.conditionId,
          indexSets,
          { from: account }
        );
      }
    }

    await redeemPositionsThroughAllMarkets(
      markets.length,
      `0x${"0".repeat(64)}`
    );
  }

  return (
    <div className={cn("your-positions")}>
      <h2>My Positions</h2>
      {positionGroups == null ? (
        <Spinner width={25} height={25} />
      ) : positionGroups.length === 0 ? (
        <em>{"You don't hold any positions."}</em>
      ) : (
        <>
          {allMarketsResolved && (
            <p>
              <p>
                Redeeming your positions will net you a total of{" "}
                {formatCollateral(redemptionAmount, collateral)}
              </p>
              <div className={cn("controls")}>
                <button
                  className="jr-btn btn btn-primary"
                  type="button"
                  disabled={ongoingTransactionType != null}
                  onClick={asWrappedTransaction(
                    "redeem positions",
                    redeemPositions,
                    setError
                  )}
                >
                  {ongoingTransactionType === "redeem positions" ? (
                    <Spinner inverted width={25} height={25} className="m-0" />
                  ) : (
                    <p className="m-0">Redeem Positions</p>
                  )}
                </button>
              </div>
              {error != null && (
                <span className="text-danger">{error.message}</span>
              )}
            </p>
          )}
          <div className="form-group mt-3">
            <div className="jr-card p-0 border-0 mb-0">
              <div className="jr-card-body">
                <ul className="overflow-hidden list-group">
                  {positionGroups.map(positionGroup => {
                    const isSalePositionGroup =
                      salePositionGroup != null &&
                      salePositionGroup.collectionId ===
                        positionGroup.collectionId;

                    return (
                      <li
                        className="d-flex align-items-center list-group-item row m-0 pl-0 pr-0"
                        key={positionGroup.collectionId}
                      >
                        <div className="rc-collapse col-12">
                          <div className="rc-collapse-item rc-collapse-item-active">
                            <div
                              className="rc-collapse-header"
                              role="button"
                              tabIndex="0"
                              aria-expanded="true"
                            >
                              <i className="arrow" />
                              <span className="mr-3">
                                <img
                                  className="market-avatar size-50"
                                  alt="Position Icon"
                                  src={positionGroup.icon}
                                />
                              </span>
                              <div className="m-0 d-inline-block">
                                <PositionGroupDetails
                                  {...{
                                    positionGroup,
                                    collateral
                                  }}
                                />
                                {marketStage !== "Closed" && (
                                  <div className={cn("controls")}>
                                    <button
                                      className="jr-btn btn btn-primary m-0"
                                      type="button"
                                      onClick={() => {
                                        setStagedTransactionType(
                                          "sell outcome tokens"
                                        );
                                        setSalePositionGroup(
                                          isSalePositionGroup
                                            ? null
                                            : positionGroup
                                        );
                                        setSaleAmount("");
                                      }}
                                    >
                                      {(!isSalePositionGroup ||
                                        marketStage === "Closed") &&
                                        "Sell"}
                                      {isSalePositionGroup &&
                                        marketStage !== "Closed" &&
                                        "Close"}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="rc-collapse-content rc-collapse-content-active">
                              <div className="rc-collapse-content-box">
                                {isSalePositionGroup &&
                                  marketStage !== "Closed" && (
                                    <div className="form-group mt-3 row">
                                      <div className="col-12">
                                        <p>
                                          You can sell a maximum amount of{" "}
                                          {formatCollateral(
                                            positionGroup.amount,
                                            collateral
                                          )}{" "}
                                          of this position.
                                        </p>
                                      </div>
                                      <div className="col-12">
                                        <label htmlFor="amountTokenToSell">
                                          Amount of tokens to sell
                                        </label>
                                      </div>
                                      <div className="col-sm-2 col-12">
                                        <input
                                          type="text"
                                          id="amountTokenToSell"
                                          className="form-control"
                                          placeholder="10"
                                          value={saleAmount}
                                          onChange={e => {
                                            setStagedTransactionType(
                                              "sell outcome tokens"
                                            );
                                            setSaleAmount(e.target.value);
                                          }}
                                        />
                                      </div>
                                      <div className="col-sm-auto col-12 pl-0">
                                        <button
                                          className="btn-sm btn btn-primary m-0"
                                          type="button"
                                          onClick={() => {
                                            setStagedTransactionType(
                                              "sell outcome tokens"
                                            );
                                            setSaleAmount(
                                              collateral.fromUnitsMultiplier
                                                .mul(
                                                  positionGroup.amount.toString()
                                                )
                                                .toFixed()
                                            );
                                          }}
                                        >
                                          Max Amount
                                        </button>
                                      </div>
                                      <div className="col-sm-auto col-12 pl-0">
                                        <button
                                          className="btn-sm btn btn-success m-0"
                                          type="button"
                                          disabled={
                                            stagedTradeAmounts == null ||
                                            stagedTransactionType !==
                                              "sell outcome tokens" ||
                                            ongoingTransactionType != null ||
                                            marketStage !== "Running" ||
                                            error != null
                                          }
                                          onClick={asWrappedTransaction(
                                            "sell outcome tokens",
                                            sellOutcomeTokens,
                                            setError
                                          )}
                                        >
                                          {ongoingTransactionType ===
                                          "sell outcome tokens" ? (
                                            <Spinner
                                              inverted
                                              width={12}
                                              height={12}
                                            />
                                          ) : marketStage === "Paused" ? (
                                            "[Market paused]"
                                          ) : (
                                            "Confirm"
                                          )}
                                        </button>
                                      </div>
                                      <div className="col-sm-auto col-12 pl-0 pt-1 pb-0">
                                        <p>
                                          {estimatedSaleEarnings &&
                                            estimatedSaleEarnings > 0 && (
                                              <span>
                                                Estimated earnings from sale:{" "}
                                                {formatCollateral(
                                                  estimatedSaleEarnings,
                                                  collateral
                                                )}
                                              </span>
                                            )}
                                          {error != null && (
                                            <span className="text-danger">
                                              {error.message}
                                            </span>
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

YourPositions.propTypes = {
  account: PropTypes.string.isRequired,
  PMSystem: PropTypes.object.isRequired,
  markets: PropTypes.arrayOf(
    PropTypes.shape({
      outcomes: PropTypes.arrayOf(
        PropTypes.shape({
          positions: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired
            }).isRequired
          ).isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired,
  marketResolutionStates: PropTypes.arrayOf(
    PropTypes.shape({
      isResolved: PropTypes.bool.isRequired,
      payoutNumerators: PropTypes.arrayOf(PropTypes.instanceOf(BN).isRequired),
      payoutDenominator: PropTypes.instanceOf(BN)
    }).isRequired
  ),
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      positionIndex: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  collateral: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    decimals: PropTypes.number.isRequired
  }).isRequired,
  LMSRMarketMaker: PropTypes.object.isRequired,
  LMSRState: PropTypes.shape({
    funding: PropTypes.object.isRequired,
    positionBalances: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    stage: PropTypes.string.isRequired
  }),
  positionBalances: PropTypes.arrayOf(PropTypes.object.isRequired),
  stagedTradeAmounts: PropTypes.arrayOf(
    PropTypes.instanceOf(Decimal).isRequired
  ),
  setStagedTradeAmounts: PropTypes.func.isRequired,
  stagedTransactionType: PropTypes.string,
  setStagedTransactionType: PropTypes.func.isRequired,
  ongoingTransactionType: PropTypes.string,
  asWrappedTransaction: PropTypes.func.isRequired
};

export default connect(
  state => ({
    account: state.marketData.account,
    markets: state.marketData.markets,
    PMSystem: state.marketData.PMSystem,
    marketResolutionStates: state.marketData.marketResolutionStates,
    positions: state.marketData.positions,
    collateral: state.marketData.collateral,
    LMSRMarketMaker: state.marketData.LMSRMarketMaker,
    LMSRState: state.marketData.LMSRState,
    positionBalances: state.marketData.positionBalances,
    stagedTradeAmounts: state.marketData.stagedTradeAmounts,
    stagedTransactionType: state.marketData.stagedTransactionType,
    ongoingTransactionType: state.marketData.ongoingTransactionType
  }),
  dispatch => ({
    setStagedTradeAmounts: bindActionCreators(
      marketDataActions.setStagedTradeAmounts,
      dispatch
    ),
    setStagedTransactionType: bindActionCreators(
      marketDataActions.setStagedTransactionType,
      dispatch
    )
  })
)(YourPositions);
