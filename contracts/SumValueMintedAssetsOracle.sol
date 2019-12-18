pragma solidity ^0.5.1;

import { PredictionMarketSystem } from "@gnosis.pm/hg-contracts/contracts/PredictionMarketSystem.sol";
import { TargetValueOracle } from "./TargetValueOracle.sol";

interface ChainlinkEcoTree {
  // function sumNbrArbres() external returns (uint256 a);
  function sumPrixTtc() external returns (uint256 a);
}

contract SumValueMintedAssetsOracle is TargetValueOracle {
  ChainlinkEcoTree internal chainlinkedEcoTree;

  constructor (
    PredictionMarketSystem pmSystem,
    uint resolutionTime,
    uint difficultyTarget,
    bytes32 questionId,
    address _chainlinkedEcoTree
  ) public TargetValueOracle(pmSystem, resolutionTime, difficultyTarget, questionId) {
    chainlinkedEcoTree = ChainlinkEcoTree(_chainlinkedEcoTree);
  }

  function readValue() internal returns(uint) {
    return uint(chainlinkedEcoTree.sumPrixTtc());
  }
}
