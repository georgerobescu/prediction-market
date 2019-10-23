import * as React from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import Web3 from "web3";
import * as marketDataActions from "../actions/marketData";
import * as web3Actions from "../actions/web3Actions";
import ConnectionBanner from "@rimble/connection-banner";
import ConnectionModal from "../utils/components/ConnectionModal";

export interface IProps {
  children: any,
  initialized: any,
  setNetworkId: Function,
  networkId: any,
  setLoadingAttempted: Function,
  loadingAttempted: any
}

class DisplayIfWeb3Loaded extends React.Component<IProps> {
  public componentDidMount() {
    const { setNetworkId, setLoadingAttempted } = this.props;

    (async() => {
      try {
        while(!this.context.drizzle.web3.hasOwnProperty("eth"))
            await new Promise(resolve => setTimeout(resolve, 100));
        this.context.drizzle.web3.eth.net.getId((_, networkId) => {
          setNetworkId(networkId);
          setLoadingAttempted(true);
        });
      } catch (e) {
        setLoadingAttempted(true);
      }
    })();
  }
  public render() {
    const { initialized, children, networkId, loadingAttempted } = this.props;

    if (!loadingAttempted) {
      return <ConnectionModal
        closeModal={() => {}}
        isOpen={true}
        validateAccount={() => {
          // @ts-ignore
          if (window.ethereum) {
            // @ts-ignore
            window.web3 = new Web3(window.ethereum);
            try {
              // @ts-ignore
              window.ethereum.enable();
            } catch (error) {
              console.error("The user didn't connect to Web3.");
              console.error(error);
              // User denied account access...
            }
          }
          // Legacy dapp browsers...
          // @ts-ignore
          else if (window.web3) {
            // @ts-ignore
            window.web3 = new Web3(window.web3.currentProvider);
          }
          // Non-dapp browsers...
          else {
            console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
          }
        }}
      />;
    }

    if (!initialized) {
      return <div className="col-sm-6 offset-sm-3 mt-5">
        <ConnectionBanner
          currentNetwork={networkId}
          requiredNetwork={4}
          onWeb3Fallback={networkId === null}
        />
      </div>;
    }

    return <>{children}</>;
  }
}

// @ts-ignore
DisplayIfWeb3Loaded.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    initialized: state.drizzleStatus.initialized,
    networkId: state.marketData.networkId,
    loadingAttempted: state.web3Reducer.loadingAttempted
  }
}

export default drizzleConnect(DisplayIfWeb3Loaded, mapStateToProps, dispatch => ({
  setNetworkId: bindActionCreators(marketDataActions.setNetworkId, dispatch),
  setLoadingAttempted: bindActionCreators(web3Actions.setLoadingAttempted, dispatch)
}));
