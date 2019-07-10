import React from "react";
import PropTypes from "prop-types";
import { formatCollateral, pseudoMarkdown } from "../utils/formatting";

export default function PositionGroupDetails({ positionGroup, collateral }) {
  return (
    <>
      <strong>
        {formatCollateral(positionGroup.runningAmount, collateral)}
      </strong>
      &nbsp;
      {positionGroup.outcomeSet.length === 0 ? (
        <span>in any case</span>
      ) : (
        <>
          when{" "}
          {positionGroup.outcomeSet
            .map(({ when }) => pseudoMarkdown(when))
            .reduce((a, b) => (
              <>
                {a} <strong>and</strong> {b}
              </>
            ))}
        </>
      )}
    </>
  );
}

PositionGroupDetails.propTypes = {
  positionGroup: PropTypes.shape({
    runningAmount: PropTypes.object.isRequired,
    outcomeSet: PropTypes.arrayOf(
      PropTypes.shape({
        when: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }),
  collateral: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    decimals: PropTypes.number.isRequired
  }).isRequired
};
