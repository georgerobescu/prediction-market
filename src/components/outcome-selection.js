import React from "react";
import PropTypes from "prop-types";

import cn from "classnames";

const assumptionText = ({ marketSelection, outcomes }) =>
  marketSelection != null
    ? marketSelection.selectedOutcomeIndex == null
      ? "To select an assumption, make a selection above"
      : `Assuming "${outcomes[marketSelection.selectedOutcomeIndex].short}" occurred`
    : "Loading...";

const OutcomeSelection = ({
  outcomes,
  marketSelection,
  setMarketSelection
}) => (
  <>
    <div className={cn("row-outcomes") + " d-flex row m-0"}>
      {outcomes.map((outcome, index) => (
        <div
          className="custom-control custom-radio mr-4"
          key={outcome.collectionId}
        >
          <input
            type="radio"
            disabled={marketSelection === null}
            id={outcome.collectionId}
            name="selectedOutcome"
            value={outcome.collectionId}
            className="custom-control-input"
            onChange={() =>
              setMarketSelection({
                selectedOutcomeIndex: index,
                isAssumed: marketSelection.isAssumed
              })
            }
            checked={
              marketSelection !== null &&
              marketSelection.selectedOutcomeIndex === index
            }
          />
          <label
            className="custom-control-label"
            htmlFor={outcome.collectionId}
          >
            {outcome.short}
          </label>
        </div>
      ))}
      <div className="custom-control custom-radio mr-4">
        <input
          type="radio"
          disabled={marketSelection === null}
          id="dontKnow"
          name="selectedOutcome"
          value="dontKnow"
          className="custom-control-input"
          onChange={() =>
            setMarketSelection({
              selectedOutcomeIndex: null,
              isAssumed: false
            })
          }
          checked={
            marketSelection !== null &&
            marketSelection.selectedOutcomeIndex === null
          }
        />
        <label className="custom-control-label" htmlFor="dontKnow">
          {"I don't know"}
        </label>
      </div>
    </div>
    <div className={cn("row-assume")}>
      <div className="custom-control custom-checkbox my-1 mr-sm-2">
        {marketSelection != null &&
          marketSelection.selectedOutcomeIndex != null && (
            <>
              <input
                type="checkbox"
                className="custom-control-input"
                id="assumptionCheckbox"
                checked={marketSelection != null && marketSelection.isAssumed}
                disabled={
                  marketSelection == null ||
                  marketSelection.selectedOutcomeIndex == null
                }
                onChange={() =>
                  setMarketSelection({
                    selectedOutcomeIndex: marketSelection.selectedOutcomeIndex,
                    isAssumed: !marketSelection.isAssumed
                  })
                }
              />
              <label
                className="custom-control-label"
                htmlFor="assumptionCheckbox"
              >
                {assumptionText({ marketSelection, outcomes })}
              </label>
            </>
          )}
        {(marketSelection === null ||
          marketSelection.selectedOutcomeIndex === null) && (
          <div>{assumptionText({ marketSelection, outcomes })}</div>
        )}
      </div>
    </div>
  </>
);

OutcomeSelection.propTypes = {
  outcomes: PropTypes.arrayOf(
    PropTypes.shape({
      short: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  marketSelection: PropTypes.shape({
    selectedOutcomeIndex: PropTypes.number,
    isAssumed: PropTypes.bool.isRequired
  }),
  setMarketSelection: PropTypes.func.isRequired
};

export default OutcomeSelection;
