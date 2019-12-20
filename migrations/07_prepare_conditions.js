const deployConfig = require("./utils/deploy-config");

module.exports = function(deployer) {
  deployer.then(async () => {
    const pmSystem = await artifacts
      .require("PredictionMarketSystem")
      .deployed();
    await pmSystem.prepareCondition(
      artifacts.require("SumValueMintedAssetsOracle").address,
      deployConfig.sumMintedQuestionID,
      2
    );
    // await pmSystem.prepareCondition(
    //   artifacts.require("TokenSupplyOracle").address,
    //   deployConfig.daiSupplyQuestionID,
    //   2
    // );
    // await pmSystem.prepareCondition(
    //   artifacts.require("DaiStabilityFeeOracle").address,
    //   deployConfig.daiStabilityFeeQuestionID,
    //   2
    // );
    // await pmSystem.prepareCondition(
    //   deployConfig.ecoTreeContractAddress,
    //   deployConfig.ecoTreeQuestion0ID,
    //   2
    // );
    // await pmSystem.prepareCondition(
    //   deployConfig.ecoTreeContractAddress,
    //   deployConfig.ecoTreeQuestion1ID,
    //   2
    // );
    // await pmSystem.prepareCondition(
    //   deployConfig.ecoTreeContractAddress,
    //   deployConfig.ecoTreeQuestion2ID,
    //   2
    // );
    // await pmSystem.prepareCondition(
    //   deployConfig.ecoTreeContractAddress,
    //   deployConfig.ecoTreeQuestion3ID,
    //   2
    // );
    // await pmSystem.prepareCondition(
    //   deployConfig.ecoTreeContractAddress,
    //   deployConfig.ecoTreeQuestion4ID,
    //   2
    // );
  });
};
