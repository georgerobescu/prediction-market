const deployConfig = require("./utils/deploy-config");

module.exports = function(deployer) {
  const RinkebyChainlinkedEcoTree =
    "0xCCccCb48132191636B95aBF45e32BaFbf5A77f5c";

  deployer.deploy(
    artifacts.require("SumValueMintedAssetsOracle"),
    artifacts.require("PredictionMarketSystem").address,
    deployConfig.sumMintedResolutionTime,
    deployConfig.sumMintedTargetValue,
    deployConfig.sumMintedQuestionID,
    // artifacts.require("DutchXStandin").address,
    // artifacts.require("DaiStandin").address,
    RinkebyChainlinkedEcoTree
  );
};
