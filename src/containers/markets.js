import React, { useEffect } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import Decimal from "decimal.js-light";
import { bindActionCreators } from "redux";
import * as marketDataActions from "../actions/marketData";
import Market from "../components/market";
import PositionCreation from "../components/PositionCreation";
import { drizzleConnect } from "drizzle-react";

import { zeroDecimal, oneDecimal } from "../utils/constants";

function calcSelectedMarketProbabilitiesFromPositionProbabilities(
  markets,
  allPositions,
  marketSelections,
  positionProbabilities
) {
  const sumConsideredPositionProbabilities = whichPositions =>
    whichPositions
      .filter(({ outcomes }) =>
        outcomes.value.map(
          ({ marketIndex, outcomeIndex }) =>
            !marketSelections[marketIndex].isAssumed ||
            outcomeIndex === marketSelections[marketIndex].selectedOutcomeIndex
        )
      )
      .reduce(
        (acc, { positionIndex }) =>
          acc.add(positionProbabilities[positionIndex]),
        zeroDecimal
      );

  const allConsideredPositionsProbability = sumConsideredPositionProbabilities(
    allPositions
  );
  return markets.map(({ outcomes }, i) =>
    marketSelections != null && marketSelections[i].isAssumed
      ? outcomes.map((_, j) =>
          marketSelections[i].selectedOutcomeIndex === j
            ? oneDecimal
            : zeroDecimal
        )
      : outcomes.map(({ positions }) =>
          sumConsideredPositionProbabilities(positions).div(
            allConsideredPositionsProbability
          )
        )
  );
}

const Markets = ({
  markets,
  marketResolutionStates,
  positions,
  LMSRState,
  marketSelections,
  setMarketSelections,
  stagedTradeAmounts,
  openMarketIndex
}) => {
  useEffect(() => {
    setMarketSelections(
      Array.from({ length: markets.length }, () => ({
        selectedOutcomeIndex: null,
        isAssumed: false
      }))
    );
    return () => {
      setMarketSelections(null);
    };
  }, [markets, setMarketSelections]);

  let marketProbabilities = null;
  let marketProbabilitiesAfterStagedTrade = null;

  if (LMSRState != null) {
    const { funding, positionBalances } = LMSRState;
    const invB = new Decimal(positionBalances.length)
      .ln()
      .div(funding.toString());

    const positionProbabilities = positionBalances.map(balance =>
      invB
        .mul(balance.toString())
        .neg()
        .exp()
    );

    if (marketSelections) {
      marketProbabilities = calcSelectedMarketProbabilitiesFromPositionProbabilities(
        markets,
        positions,
        marketSelections,
        positionProbabilities
      );
    }

    if (stagedTradeAmounts != null) {
      const unnormalizedPositionProbabilitiesAfterStagedTrade = positionProbabilities.map(
        (probability, i) =>
          probability.mul(stagedTradeAmounts[i].mul(invB).exp())
      );
      const normalizer = oneDecimal.div(
        unnormalizedPositionProbabilitiesAfterStagedTrade.reduce((a, b) =>
          a.add(b)
        )
      );
      const positionProbabilitiesAfterStagedTrade = unnormalizedPositionProbabilitiesAfterStagedTrade.map(
        probability => probability.mul(normalizer)
      );

      marketProbabilitiesAfterStagedTrade = calcSelectedMarketProbabilitiesFromPositionProbabilities(
        markets,
        positions,
        marketSelections,
        positionProbabilitiesAfterStagedTrade
      );
    }
  }

  return (
    <>
      {/* Display the position creation dialog (if it should be open) */}
      {openMarketIndex >= 0 && (
        <PositionCreation
          {...{
            probabilities:
              marketProbabilities != null
                ? marketProbabilities[openMarketIndex]
                : null,
            stagedProbabilities:
              marketProbabilitiesAfterStagedTrade != null
                ? marketProbabilitiesAfterStagedTrade[openMarketIndex]
                : null,
            marketSelection:
              marketSelections != null
                ? marketSelections[openMarketIndex]
                : null,
            setMarketSelection(marketSelection) {
              setMarketSelections(
                marketSelections.map((originalMarketSelection, j) =>
                  openMarketIndex === j
                    ? marketSelection
                    : originalMarketSelection
                )
              );
            }
          }}
        />
      )}
      <div className="row">
        <div className="offset-lg-3 col-sm-4 offset-md-2">
          <h1 className={cn("page-title")}>FCLA PREDICTION MARKET</h1>
        </div>
      </div>
      <div className="row">
        <div className={cn("section", "market-section") + " col-sm-12"}>
          {markets.map((market, i) => (
            <Market
              marketIndex={i}
              lastMarketListed={i === markets.length - 1}
              key={market.conditionId}
              {...{
                ...market,
                LMSRState,
                resolutionState:
                  marketResolutionStates != null
                    ? marketResolutionStates[i]
                    : null,
                probabilities:
                  marketProbabilities != null ? marketProbabilities[i] : null,
                stagedProbabilities:
                  marketProbabilitiesAfterStagedTrade != null
                    ? marketProbabilitiesAfterStagedTrade[i]
                    : null,
                marketSelection:
                  marketSelections != null ? marketSelections[i] : null,
                setMarketSelection(marketSelection) {
                  setMarketSelections(
                    marketSelections.map((originalMarketSelection, j) =>
                      i === j ? marketSelection : originalMarketSelection
                    )
                  );
                }
              }}
            />
          ))}
        </div>
        <div className={cn("separator")} />
      </div>
    </>
  );
};

Markets.propTypes = {
  markets: PropTypes.arrayOf(
    PropTypes.shape({
      conditionId: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  marketResolutionStates: PropTypes.array,
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      positionIndex: PropTypes.number.isRequired,
      outcomes: PropTypes.shape({
        value: PropTypes.arrayOf(
          PropTypes.shape({
            marketIndex: PropTypes.number.isRequired,
            outcomeIndex: PropTypes.number.isRequired
          }).isRequired
        ).isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  LMSRState: PropTypes.shape({
    funding: PropTypes.object.isRequired,
    positionBalances: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  }),
  marketSelections: PropTypes.arrayOf(
    PropTypes.shape({
      selectedOutcomeIndex: PropTypes.number,
      isAssumed: PropTypes.bool.isRequired
    }).isRequired
  ),
  setMarketSelections: PropTypes.func.isRequired,
  stagedTradeAmounts: PropTypes.arrayOf(
    PropTypes.instanceOf(Decimal).isRequired
  ),
  openMarketIndex: PropTypes.number.isRequired
};

export default drizzleConnect(
  Markets,
  state => ({
    markets: state.marketData.markets,
    positions: state.marketData.positions,
    LMSRState: state.marketData.LMSRState,
    marketResolutionStates: state.marketData.marketResolutionStates,
    marketSelections: state.marketData.marketSelections,
    stagedTradeAmounts: state.marketData.stagedTradeAmounts,
    openMarketIndex: state.positionCreation.openMarketIndex
  }),
  dispatch => ({
    setMarketSelections: bindActionCreators(
      marketDataActions.setMarketSelections,
      dispatch
    )
  })
);
