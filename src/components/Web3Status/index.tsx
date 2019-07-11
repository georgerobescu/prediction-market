import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as web3Actions from '../../actions/web3Actions';
import * as Web3Utils from '../../utils/web3-helpers';

export interface IProps {
  web3: any;
  setIsAnyUnlockedAccount: (isUnlocked: boolean) => any;
  isAnyUnlockedAccount: boolean;
  setWeb3Status: Function;
  web3Status: string;
}

class Header extends React.Component<IProps> {
  public componentDidMount() {
    const { web3, setIsAnyUnlockedAccount } = this.props;

    // Check if there are any unlocked accounts using Web3Utils and then save result to Redux
    Web3Utils.isAnyUnlockedAccount(web3)
      .then(() => setIsAnyUnlockedAccount(true))
      .catch(() => setIsAnyUnlockedAccount(false));

    // Update web3 status on an interval
    setInterval(this.setWeb3StatusMessage, 1000 * 10);
  }
  setWeb3StatusMessage = () => {
    const { web3, isAnyUnlockedAccount, setWeb3Status } = this.props;

    const noWeb3Failure = 'Install MetaMask';
    const noUnlockedAccountFailure = 'Unlock MetaMask';
    const success = 'MetaMask Connected';

    if (!isAnyUnlockedAccount) { return setWeb3Status(noUnlockedAccountFailure); }

    try {
      return web3.eth.net.isListening()
       .then(() => setWeb3Status(success))
       .catch(() => setWeb3Status(noWeb3Failure));
    } catch (e) {
      return setWeb3Status(noWeb3Failure);
    }
  }
  public render() {
    const { web3Status } = this.props;
    return (
      <div>
        <button className="jr-btn jr-btn-xs jr-btn-primary btn btn-default">{web3Status}</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    // @ts-ignore
    web3: state.marketData.web3,
    // @ts-ignore
    isAnyUnlockedAccount: state.web3.isAnyUnlockedAccount,
    // @ts-ignore
    web3Status: state.web3.web3Status
  }),
  dispatch => ({
    setIsAnyUnlockedAccount: bindActionCreators(web3Actions.setIsAnyUnlockedAccount, dispatch),
    setWeb3Status: bindActionCreators(web3Actions.setWeb3Status, dispatch)
  })
)(Header);
