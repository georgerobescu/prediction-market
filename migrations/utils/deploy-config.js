const web3 = require("web3");

// default to 30 days later
const defaultResolutionTime = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

// default dates for mock API values
const beginning2020 =
  Math.floor(Date.now() / 1000) + (new Date(2020, 1, 1) - Date.now()) / 1000;
const beginning2021 =
  Math.floor(Date.now() / 1000) + (new Date(2021, 1, 1) - Date.now()) / 1000;
const beginning2094 =
  Math.floor(Date.now() / 1000) + (new Date(2094, 1, 1) - Date.now()) / 1000;

module.exports = {
  // Dai Deployment Configs
  daiPriceResolutionTime:
    process.env.DAIPRICERESOLUTIONTIME || defaultResolutionTime,
  daiPriceTargetValue: process.env.DAIPRICETARGETVALUE || "1" + "0".repeat(18),
  daiPriceQuestionID: process.env.DAIPRICEQUESTIONID || "0x01",

  daiSupplyResolutionTime:
    process.env.DAISUPPLYRESOLUTIONTIME || defaultResolutionTime,
  daiSupplyTargetValue:
    process.env.DAISUPPLYTARGETVALUE || "81000000" + "0".repeat(18),
  daiSupplyQuestionID: process.env.DAISUPPLYQUESTIONID || "0x02",

  daiStabilityFeeResolutionTime:
    process.env.DAISTABILITYFEERESOLUTIONTIME || defaultResolutionTime,
  daiStabilityFeeTargetValue:
    process.env.DAISTABILITYFEETARGETVALUE || "1000000005113779426955452540",
  daiStabilityFeeQuestionID: process.env.DAISTABILITYFEEQUESTIONID || "0x03",

  ecoTreeQuestion0ID: process.env.ECOTREEQUESTION0ID || "0x04",
  ecoTreeQuestion1ID: process.env.ECOTREEQUESTION1ID || "0x05",
  ecoTreeQuestion2ID: process.env.ECOTREEQUESTION2ID || "0x06",
  ecoTreeQuestion3ID: process.env.ECOTREEQUESTION3ID || "0x07",
  ecoTreeQuestion4ID: process.env.ECOTREEQUESTION4ID || "0x08",
  ecoTreeQuestion5ID: process.env.ECOTREEQUESTION5ID || "0x09",
  ecoTreeQuestion6ID: process.env.ECOTREEQUESTION6ID || "0x10",
  ecoTreeQuestion7ID: process.env.ECOTREEQUESTION7ID || "0x11",
  ecoTreeQuestion8ID: process.env.ECOTREEQUESTION8ID || "0x12",
  // iceAliveQuestionID: process.env.ICEALIVEQUESTIONID || "0x09",

  ecoTreeContractAddress:
    process.env.ECOTREECONTRACTADDRESS ||
    web3.utils.toChecksumAddress("0xd8E1E592f77969607c65DA1683769614ACf6b4fC"),
  iceAliveContractAddress:
    process.env.ICEALIVECONTRACTADDRESS ||
    web3.utils.toChecksumAddress(`0x${"00".repeat(20)}`),

  ammFunding: process.env.AMMFUNDING || "1000" + "0".repeat(18),

  // For mock API values
  ecoTreeRegistrationTargetValue:
    process.env.ECOTREEREGISTRATIONTARGETVALUE || 30,
  ecoTreeRegistrationTargetTime:
    process.env.ECOTREEREGISTERATIONTARGETTIME || beginning2020,

  iceAliveMeltRateTarget: process.env.ICEALIVEMELTRATETARGET || 1.2,
  iceAliveMeltRateTargetTime:
    process.env.ICEALIVEMELTRATETARGETTIME || beginning2021,

  ecoTreeHarvestTime: process.env.ECOTREEHARVESTTIME || beginning2094,

  AXAParametricInsuranceTargetValue: 100000,
  AXAParametricInsuranceTargetTime: beginning2020
};
