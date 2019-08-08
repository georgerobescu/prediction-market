pragma solidity ^0.4.24;

import "chainlink/contracts/ChainlinkClient.sol";

// ChainlinkEcoTree inherits the Chainlinked contract to gain the
// functionality of creating Chainlink requests.
contract ChainlinkEcoTree is ChainlinkClient {
  bytes32 public forest;

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
  
  // Creates a Chainlink request with the bytes32 job and returns the requestId
  function requestForest(bytes32 _jobId) public returns (bytes32 requestId) {
    // newRequest takes a JobID, a callback address, and callback function as input
    Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfillForest.selector);
    // Adds a URL with the key "get" to the request parameters
    req.add("get", "http://private-486b5-leopoldjoy.apiary-mock.com/forests");
    // Adds a dot-delimited JSON path with the key "path" to the request parameters
    req.add("path", "some");
    // Sends the request with 1 LINK to the oracle contract
    requestId = sendChainlinkRequest(req, 1 * LINK);
  }

  // fulfillForest receives a bytes32 data type
  function fulfillForest(bytes32 _requestId, bytes32 _forest)
    // Use recordChainlinkFulfillment to ensure only the requesting oracle can fulfill
    public recordChainlinkFulfillment(_requestId) {
    forest = _forest;
  }
}
