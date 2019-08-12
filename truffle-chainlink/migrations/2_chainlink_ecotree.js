const ChainlinkEcoTree = artifacts.require("ChainlinkEcoTree"); // eslint-disable-line

module.exports = function(deployer) {
  const RinkebyLINKAddress = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709";
  const RinkebyOracleAddress = "0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e";

  deployer.deploy(ChainlinkEcoTree, RinkebyLINKAddress, RinkebyOracleAddress);
};
