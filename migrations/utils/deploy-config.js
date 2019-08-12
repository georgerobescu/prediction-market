// default to 30 days later
const defaultResolutionTime = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

// default dates for mock API values
const beginning2020 =
  Math.floor(Date.now() / 1000) + (new Date(2020, 1, 1) - Date.now()) / 1000;
const beginning2021 =
  Math.floor(Date.now() / 1000) + (new Date(2021, 1, 1) - Date.now()) / 1000;

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

  ammFunding: process.env.AMMFUNDING || "1000" + "0".repeat(18),

  // For mock API values
  ecoTreeRegistrationTargetValue:
    process.env.ECOTREEREGISTRATIONTARGETVALUE || 30,
  ecoTreeRegistrationTargetTime:
    process.env.ECOTREEREGISTERATIONTARGETTIME || beginning2020,

  iceAliveMeltRateTarget: process.env.ICEALIVEMELTRATETARGET || 1.2,
  iceAliveMeltRateTargetTime:
    process.env.ICEALIVEMELTRATETARGETTIME || beginning2021,

  AXAParametricInsuranceTargetValue: 100000,
  AXAParametricInsuranceTargetTime: beginning2020
};
