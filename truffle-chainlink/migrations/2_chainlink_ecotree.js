const ChainlinkEcoTree = artifacts.require("ChainlinkEcoTree"); // eslint-disable-line

module.exports = function(deployer) {
  const RinkebyLINKAddress = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709";
  const RinkebyOracleAddress = "0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e";
  const RinkebyETDivision = "0x76b8e6AcB389090f38d37A82d521d8ef0D6E2318";

  deployer.deploy(
    ChainlinkEcoTree,
    RinkebyLINKAddress,
    RinkebyOracleAddress,
    RinkebyETDivision
  );
};
