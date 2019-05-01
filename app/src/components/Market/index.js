import React from "react";
import PropTypes from "prop-types";
import OutcomesBinary from "../OutcomesBinary";
import OutcomeSelection from "../OutcomeSelection";
import cn from "classnames/bind";

import css from "./style.scss";

const cx = cn.bind(css);

const Market = ({
  title,
  resolutionDate,
  outcomes,
  conditionId,
  isResolved,
  result,

  assumed,
  disabled,
  selectedOutcome,

  predictionProbabilities,

  marketIndex,

  handleSelectAssumption,
  handleSelectOutcome
}) => {
  let probabilities = outcomes.map(outcome => outcome.probability);

  if (assumed) {
    probabilities = outcomes.map((outcome, outcomeIndex) =>
      parseInt(selectedOutcome, 10) === outcomeIndex ? 1 : 0
    );
  }

  let outcomesWithProbabilities = outcomes.map((outcome, index) => ({
    ...outcome,
    probability: probabilities[index]
  }));

  return (
    <article className={cx("market", { disabled })}>
      <section className={cx("title-section")}>
        <h1 className={cx("title")}>{title}</h1>
        <div className={cx("title-infos")}>
          <div className={cx("title-info")}>
            {isResolved ? (
              <>
                <h2 className={cx("label")}>winning outcome</h2>
                <h2 className={cx("value", "centered")}>
                  {outcomes[result].title}
                </h2>
              </>
            ) : (
              <>
                <h2 className={cx("label")}>probability</h2>
                <h2 className={cx("value")}>
                  {(probabilities[0] * 100).toFixed(2)}%
                </h2>
              </>
            )}
          </div>
          {isResolved ? (
            <div className={cx("title-info")}>
              <h2 className={cx("label")}>market closed</h2>
              <h2 className={cx("value")} />
            </div>
          ) : (
            <div className={cx("title-info")}>
              <h2 className={cx("label")}>resolves</h2>
              <h2 className={cx("value")}>
                {new Date(resolutionDate).toLocaleString()}
              </h2>
            </div>
          )}
        </div>
      </section>
      <section className={cx("outcomes-section")}>
        <OutcomesBinary
          {...{
            outcomes: outcomesWithProbabilities,
            isResolved,
            predictionProbabilities: assumed
              ? []
              : predictionProbabilities[marketIndex] || []
          }}
        />
      </section>

      {!isResolved && (
        <section className={cx("selection-section")}>
          <OutcomeSelection
            {...{
              outcomes,
              conditionId,
              assumed,
              selectedOutcome,
              handleSelectAssumption,
              handleSelectOutcome
            }}
          />
        </section>
      )}
    </article>
  );
};

Market.propTypes = {
  title: PropTypes.string.isRequired,
  resolutionDate: PropTypes.string.isRequired,
  outcomes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      probability: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  conditionId: PropTypes.any.isRequired,
  isResolved: PropTypes.bool.isRequired,
  result: PropTypes.number.isRequired,

  assumed: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  selectedOutcome: PropTypes.string.isRequired,

  predictionProbabilities: PropTypes.arrayOf(PropTypes.array.isRequired)
    .isRequired,

  marketIndex: PropTypes.number.isRequired,

  handleSelectAssumption: PropTypes.any.isRequired,
  handleSelectOutcome: PropTypes.any.isRequired
};

Market.defaultProps = {
  selectedOutcomes: {}
};

export default Market;
