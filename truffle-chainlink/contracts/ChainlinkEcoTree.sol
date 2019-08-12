pragma solidity ^0.4.24;

import "chainlink/contracts/ChainlinkClient.sol";

// ChainlinkEcoTree inherits the Chainlinked contract to gain the
// functionality of creating Chainlink requests.
contract ChainlinkEcoTree is ChainlinkClient {

  bytes32 public accessible;
  uint public accessible1;
  string public accessible2;
  bytes32 public accessible3;
  bytes32 public accessible4;

  struct Forest {
    bytes32 id;
    bytes32 essence_id;
    bytes32 parcelle_id;
    bytes32 description;
    bytes32 date_plantation;
  }

  struct DataType {
    uint256 forestId;
    bytes32 typeName;
  }

  mapping (uint256 => Forest) public forests;
  mapping (bytes32 => DataType) internal requestIdToDataType;

  constructor(address _link, address _oracle) public {
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
  }

  function makeSingleRequest(bytes32 _jobId, uint i, bytes32 typeName) internal returns (bool success) {
    // Takes a JobID, a callback address, and callback function
    accessible = _jobId;
    accessible1 = i;
    Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfillForest.selector);
    // A URL with the key "get" to the request parameters
    req.add("get", string(abi.encodePacked("http://private-486b5-leopoldjoy.apiary-mock.com/forests/", uint2str(i))));
    // Dot-delimited JSON key "path" to the desired parameters
    accessible2 = bytes32ToString(typeName);
    req.add("path", bytes32ToString(typeName));
    // Send the request with 1 LINK to the oracle contract
    bytes32 requestId = sendChainlinkRequest(req, 1 * LINK);
    accessible3 = requestId;
    // Save mapping of request ID to the corrosponding forest ID and data type
    requestIdToDataType[requestId] = DataType({forestId: i, typeName: typeName});

    return true;
  }
  
  // Creates a Chainlink request with the bytes32 job and returns the requestId
  function requestForests(bytes32 _jobId, uint256 _numForests) public returns (bool success) {
    for (uint i = 0; i < _numForests; i++) {
      // Make request for ID field of this forest
      makeSingleRequest(_jobId, i, "id");
      // Make request for essence_id field of this forest
      makeSingleRequest(_jobId, i, "essence_id");
      // Make request for parcelle_id field of this forest
      makeSingleRequest(_jobId, i, "parcelle_id");
      // Make request for description field of this forest
      makeSingleRequest(_jobId, i, "description");
      // Make request for date_plantation field of this forest
      makeSingleRequest(_jobId, i, "date_plantation");
    }

    return true;
  }

  // fulfillForest receives a bytes32 data type
  function fulfillForest(bytes32 _requestId, bytes32 _forestDataField)
    // Use recordChainlinkFulfillment to ensure only the requesting oracle can fulfill
    public recordChainlinkFulfillment(_requestId) {
    accessible4 = requestIdToDataType[_requestId].typeName;
    // Set the forest's data based on retrieved forest ID
    if (requestIdToDataType[_requestId].typeName == "id") {
      forests[requestIdToDataType[_requestId].forestId].id = _forestDataField;
    } else if (requestIdToDataType[_requestId].typeName == "essence_id") {
      forests[requestIdToDataType[_requestId].forestId].essence_id = _forestDataField;
    } else if (requestIdToDataType[_requestId].typeName == "parcelle_id") {
      forests[requestIdToDataType[_requestId].forestId].parcelle_id = _forestDataField;
    } else if (requestIdToDataType[_requestId].typeName == "description") {
      forests[requestIdToDataType[_requestId].forestId].description = _forestDataField;
    } else if (requestIdToDataType[_requestId].typeName == "date_plantation") {
      forests[requestIdToDataType[_requestId].forestId].date_plantation = _forestDataField;
    }
  }

  // Helper functions
  function uint2str(uint i) internal pure returns (string){
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
}
