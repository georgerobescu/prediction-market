import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
// import styles from './CurrentNetwork.scss';
import * as web3Actions from '../../actions/web3Actions';
import * as Web3Utils from '../../utils/web3-helpers';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';

export interface IProps {
  // web3: any,
  setNetworkName: (name: string) => any;
  networkName: string;
}

class CurrentNetwork extends React.Component<IProps> {
  constructor(props, context) {
    super(props);
  }

  public componentDidMount() {
    const { /*web3, */setNetworkName } = this.props;

    // Get network name (e.g. rinkeby, main, etc.) using Web3Utils and then save result to Redux
    Web3Utils.getNetworkNameOld(this.context.drizzle.web3)
      .then(setNetworkName)
      .catch((name: string) => setNetworkName(''));
  }

  public render() {
    let { networkName } = this.props;

    let classbox= 'jr-btn jr-btn-xs jr-btn-primary btn btn-default';
    let styleIcon= 'red';
    // let style = styles.unknownCircle

    if (networkName !== 'rinkeby' && networkName !== 'main') {
      networkName = 'Unknown Network';
    }

    if (networkName === 'rinkeby') {
      // style= styles.rinkebyCircle;
      classbox= 'jr-btn jr-btn-xs jr-btn-primary btn btn-default';
      styleIcon= 'orange';
      networkName = 'Rinkeby Network';
    }

    if (networkName === 'main') {
      // style= styles.mainnetCircle;
      classbox= 'jr-btn jr-btn-xs jr-btn-primary btn btn-default';
      styleIcon= 'green';
      networkName = 'Main Ethereum Network';
    }

    return (
      <div>
        <button className={classbox}>
          <i className="zmdi zmdi-circle zmdi-hc-fw" style={{color:styleIcon}}/> {networkName}
        </button>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     web3: state.web3
//   }
// }

// @ts-ignore
CurrentNetwork.contextTypes = {
  drizzle: PropTypes.object
};

export default drizzleConnect(
  CurrentNetwork,
  state => ({
    // @ts-ignore
    // web3: state.marketData.web3,
    // @ts-ignore
    networkName: state.web3Reducer.networkName
  }),
  dispatch => ({
    setNetworkName: bindActionCreators(web3Actions.setNetworkName, dispatch)
  })
);
