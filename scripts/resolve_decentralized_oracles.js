const SumValueMintedAssetsOracle = artifacts.require(
  "SumValueMintedAssetsOracle"
);
// const TokenSupplyOracle = artifacts.require("TokenSupplyOracle");
// const DaiStabilityFeeOracle = artifacts.require("DaiStabilityFeeOracle");

const inquirer = require("inquirer");

module.exports = callback => {
  new Promise(async (res, rej) => {
    let sumValueMintedAssetsOracle;
    // let daiSupplyOracle;
    // let daiStabilityFeeOracle;
    try {
      sumValueMintedAssetsOracle = await SumValueMintedAssetsOracle.deployed();
      // daiSupplyOracle = await TokenSupplyOracle.deployed();
      // daiStabilityFeeOracle = await DaiStabilityFeeOracle.deployed();
    } catch (err) {
      console.error("Please ensure the oracle contracts are deployed.");
      console.error(err.message);
      console.error(err.stack);
      rej(err);
    }

    console.log(
      `Sum Value Minted Assets Oracle deployed at ${sumValueMintedAssetsOracle.address}`
    );
    // console.log(`DAI Supply Oracle deployed at ${daiSupplyOracle.address}`);
    // console.log(
    //   `DAI Stability Oracle deployed at ${daiStabilityFeeOracle.address}`
    // );

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "oracle",
        message: "Which oracle do you want to resolve?",
        choices: [
          { value: "SumMintedAssets", name: "Sum Value Minted Assets Oracle" }
          // { value: "DAISupply", name: "DAI Supply Oracle" },
          // { value: "DAIStability", name: "DAI Stability Oracle" }
        ]
      }
    ]);

    var handle = await setInterval(async () => {
      console.log("Attmepting Another Resolve...");

      try {
        if (answers.oracle == "SumMintedAssets") {
          await sumValueMintedAssetsOracle.resolveValue();
          clearInterval(handle);
          console.log("Resolution successful!");
          res();
        } /* else if (answers.oracle == "DAISupply") {
          await daiSupplyOracle.resolveValue();
        } else if (answers.oracle == "DAIStability") {
          await daiStabilityFeeOracle.resolveValue();
        }*/
      } catch (err) {
        console.error("Not resolving yet!");
        console.error(err);
        console.log("Wait more...");
        // return rej(err);
      }
    }, 30000);
  }).then(callback, err => {
    console.log("Oracle Resolve failed");
    console.error(err);
    callback(err);
  });
};
