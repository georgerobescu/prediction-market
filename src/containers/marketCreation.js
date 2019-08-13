import React from "react";
import cn from "classnames";
import web3 from "web3";
import PropTypes from "prop-types";
import ForestData from "../components/forestData";
import MarketCreationDialog from "../components/MarketCreationDialog";
import { drizzleConnect } from "drizzle-react";

const MarketCreation = ({
  ChainlinkEcoTreeContract,
  chainlinkEcoTreeKeys,
  openCreationIndex
}) => {
  return (
    <>
      {openCreationIndex >= 0 && <MarketCreationDialog />}

      <div className="row">
        <div className="offset-lg-3 col-sm-4 offset-md-2">
          <h1 className={cn("page-title")}>
            Avaliable Market {"Data"} (via Chainlink)
          </h1>
        </div>
      </div>
      <div className="row">
        <div className={cn("section", "market-section") + " col-sm-12"}>
          {[...Array(5)].map((x, i) => (
            <ForestData
              key={i}
              title={web3.utils.toAscii(
                ChainlinkEcoTreeContract.forests[chainlinkEcoTreeKeys[i]].value
                  .description
              )}
              forestIndex={i}
              icon={"/assets/images/trees.jpg"}
            />
          ))}
        </div>
        <div className={cn("separator")} />
      </div>
    </>
  );
};

MarketCreation.propTypes = {
  openCreationIndex: PropTypes.number.isRequired,
  ChainlinkEcoTreeContract: PropTypes.any.isRequired,
  chainlinkEcoTreeKeys: PropTypes.any.isRequired
};

export default drizzleConnect(
  MarketCreation,
  // @ts-ignore
  state => ({
    // @ts-ignore
    markets: state.marketData.markets,
    // @ts-ignore
    ChainlinkEcoTreeContract: state.contracts.ChainlinkEcoTree,
    // @ts-ignore
    chainlinkEcoTreeKeys: state.contractFieldKeys.chainlinkEcoTreeKeys,
    // @ts-ignore
    openCreationIndex: state.marketCreation.openCreationIndex
  })
);
