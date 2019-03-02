import React from "react";
import Decimal from "decimal.js";
import cn from 'classnames/bind'

import { arrayToHumanReadableList } from "./utils/list";
import { formatFromWei, pseudoMarkdown } from "./utils/formatting";

import style from './style.scss'

const cx = cn.bind(style)

const YourPositions = ({ positions }) => (
  <div className={cx("your-positions")}>
    <h2>Positions</h2>
    {positions.length === 0 ?
    <em>You don't hold any positions yet.</em> :
    positions.filter(({value}) => value > 0).map((position, index) => (
      <div key={index} className={cx("position")}>
        <strong>{formatFromWei(position.value)}</strong>
        {position.marketWhens.length === 0 ?
          <> in any case</> :
          <> when {arrayToHumanReadableList(
            position.marketWhens.map(pseudoMarkdown)
          )}</>
        }
      </div>
    ))}
  </div>
);

export default YourPositions;
