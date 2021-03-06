pragma solidity ^0.4.24;

import "chainlink/contracts/ChainlinkClient.sol";
// import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

interface Division {
  // mapping (uint256 => string) public _tokenMetadataIpfsHashes;
  function _tokenMetadataIpfsHashes(uint256 arg) external returns (string a);
}

// ChainlinkEcoTree inherits the Chainlinked contract to gain the
// functionality of creating Chainlink requests.
contract ChainlinkEcoTree is ChainlinkClient {
  using SafeMath for uint256;

  Division internal deployedDivisionNFTContract;

  uint256 public sumNbrArbres;
  uint256 public sumPrixTtc;

  struct DivisionValueData {
    bytes32 nbrArbres;
    bytes32 prixTtc;
  }

  struct DataType {
    uint256 divisionId;
    bytes32 typeName;
  }

  mapping (uint256 => DivisionValueData) public divisionsValueData;
  mapping (bytes32 => DataType) internal requestIdToDataType;

  constructor(address _link, address _oracle, address _etDivision) public {
    // Set the address for the LINK token for the network.
    if(_link == address(0)) {
      // Useful for deploying to public networks.
      setPublicChainlinkToken();
    } else {
      // Useful if you're deploying to a local network.
      setChainlinkToken(_link);
    }
    // Set the oracle that will be used for making requests
    require(
      _oracle != address(0),
      "Please provide the address of a valid Chainlink oracle for the currently selected network."
    );
    setChainlinkOracle(_oracle);
    // Set address of existing (deployed) Division NFT smart contract
    deployedDivisionNFTContract = Division(_etDivision);
    // Set intial sum values
    sumNbrArbres = 0;
    sumPrixTtc = 0;
  }

  function makeSingleRequest(bytes32 _jobId, uint256 _divisionId, bytes32 _typeName) internal returns (bool success) {
    // Takes a JobID, a callback address, and callback function
    Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfillDivisionValueData.selector);
    // A URL with the key "get" to the request parameters
    req.add("get", string(abi.encodePacked("https://ecotree.fr/api/divisions/", uint2str(_divisionId))));
    // Dot-delimited JSON key "path" to the desired parameters
    req.add("path", bytes32ToString(_typeName));
    // Send the request with 1 LINK to the oracle contract
    bytes32 requestId = sendChainlinkRequest(req, 1 * LINK);
    // Save mapping of request ID to the corrosponding forest ID and data type
    requestIdToDataType[requestId] = DataType({divisionId: _divisionId, typeName: _typeName});

    return true;
  }
  
  // Creates a Chainlink request with the bytes32 job and returns the requestId
  function requestDivisionValueData(bytes32 _jobId, uint256 _divisionId) public returns (bool success) {
    // Make request for ID field of this forest
    makeSingleRequest(_jobId, _divisionId, "nbrArbres"); // nbrArbres attributes.12.value
    // Make request for essence_id field of this forest
    makeSingleRequest(_jobId, _divisionId, "prixTtc"); // prixTtc attributes.13.value

    return true;
  }

  // fulfillDivisionValueData receives a bytes32 data type
  function fulfillDivisionValueData(bytes32 _requestId, bytes32 _divisionDataField)
    // Use recordChainlinkFulfillment to ensure only the requesting oracle can fulfill
    public recordChainlinkFulfillment(_requestId) {
    // Only allow fulfillment of the division's data if the data has definitely been minted
    bytes memory checkHashEmpty = bytes(deployedDivisionNFTContract._tokenMetadataIpfsHashes(requestIdToDataType[_requestId].divisionId)); // Uses memory
    if (checkHashEmpty.length == 0) {
      return; // Since the hash is empty for that divisionId, we know this division hasn't been minted yet
    }
    // Set the forest's data field based on the fulfilled data and its type
    if (requestIdToDataType[_requestId].typeName == "nbrArbres") {
      divisionsValueData[requestIdToDataType[_requestId].divisionId].nbrArbres = _divisionDataField;
      // Update sum counter also
      sumNbrArbres = sumNbrArbres.add(stringToUint(bytes32ToString(_divisionDataField)));
    } else if (requestIdToDataType[_requestId].typeName == "prixTtc") {
      divisionsValueData[requestIdToDataType[_requestId].divisionId].prixTtc = _divisionDataField;
      // Update sum counter also
      sumPrixTtc = sumPrixTtc.add(stringToUint(bytes32ToString(_divisionDataField)));
    }
  }

  /* 
   * HELPER FUNCTIONS
   */

  function bytes32ToString(bytes32 x) internal pure returns (string) {
    bytes memory bytesString = new bytes(32);
    uint charCount = 0;
    for (uint j = 0; j < 32; j++) {
      byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
      if (char != 0) {
        bytesString[charCount] = char;
        charCount++;
      }
    }
    bytes memory bytesStringTrimmed = new bytes(charCount);
    for (j = 0; j < charCount; j++) {
        bytesStringTrimmed[j] = bytesString[j];
    }
    return string(bytesStringTrimmed);
  }

  function uint2str(uint i) internal pure returns (string) {
    if (i == 0) return "0";
    uint j = i;
    uint length;
    while (j != 0){
      length++;
      j /= 10;
    }
    bytes memory bstr = new bytes(length);
    uint k = length - 1;
    while (i != 0){
      bstr[k--] = byte(48 + i % 10);
      i /= 10;
    }
    return string(bstr);
  }

  function stringToUint(string s) internal pure returns (uint result) {
    bytes memory b = bytes(s);
    uint i;
    result = 0;
    for (i = 0; i < b.length; i++) {
      uint c = uint(b[i]);
      if (c >= 48 && c <= 57) {
        result = result * 10 + (c - 48);
      }
    }
  }
}
