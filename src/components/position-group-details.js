import React from "react";
import PropTypes from "prop-types";
import { formatCollateral, pseudoMarkdown } from "../utils/formatting";

import cn from "classnames";

export default function PositionGroupDetails({ positionGroup, collateral }) {
  return (
    <>
      <div className={cn("value")}>
        <strong>
          {formatCollateral(positionGroup.runningAmount, collateral)}
        </strong>
        &nbsp;
      </div>
      <div className={cn("description")}>
        {positionGroup.outcomeSet.length === 0 ? (
          <span>in any case</span>
        ) : (
          <>
            when{" "}
            {positionGroup.outcomeSet
              .map(({ when }) => pseudoMarkdown(when))
              .reduce((a, b) => (
                <p>
                  {a} <strong>and</strong> {b}
                </p>
              ))}
          </>
        )}
      </div>
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
