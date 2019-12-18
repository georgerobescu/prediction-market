const deployConfig = require("./utils/deploy-config");

module.exports = function(deployer) {
  const RinkebyChainlinkedEcoTree =
    "0x76b8e6AcB389090f38d37A82d521d8ef0D6E2318";

  deployer.deploy(
    artifacts.require("DutchXTokenPriceOracle"),
    artifacts.require("PredictionMarketSystem").address,
    deployConfig.daiPriceResolutionTime,
    deployConfig.daiPriceTargetValue,
    deployConfig.daiPriceQuestionID,
    // artifacts.require("DutchXStandin").address,
    // artifacts.require("DaiStandin").address,
    RinkebyChainlinkedEcoTree
  );
};
