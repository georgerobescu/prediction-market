import * as React from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import * as marketDataActions from "../actions/marketData";
import * as web3Actions from "../actions/web3Actions";
import ConnectionBanner from "@rimble/connection-banner";

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
      while(!this.context.drizzle.web3.hasOwnProperty("eth"))
          await new Promise(resolve => setTimeout(resolve, 100));
      this.context.drizzle.web3.eth.net.getId((_, networkId) => {
        setNetworkId(networkId);
        setLoadingAttempted(true);
      });
    })();
  }
  public render() {
    const { initialized, children, networkId, loadingAttempted } = this.props;

    console.log("drizzle");
    console.log(loadingAttempted);

    if (!loadingAttempted) {
      return <>Loading...</>;
    }

    if (!initialized) {
      return <ConnectionBanner
        currentNetwork={networkId}
        requiredNetwork={4}
        onWeb3Fallback={networkId === null}
      />;
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
