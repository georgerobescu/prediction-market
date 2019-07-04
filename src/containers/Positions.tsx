import * as React from 'react';
import cn from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as marketDataActions from "../actions/marketData";
import YourPositions from "../components/your-positions";
import { getNetworkName } from "../utils/web3-helpers.js";
import asWrappedTransaction from '../utils/asWrappedTransaction';
import '../style.scss';

export interface IProps {
  account: string,
  ongoingTransactionType: Object,
  setOngoingTransactionType: Function,
  networkId: number
}

export interface IState {
  marketData: Object;
}

class Positions extends React.Component<IProps, IState> {
  public render() {
    const { account, networkId } = this.props;

    return (
      <section className={cn("section", "position-section")}>
        {account == null ? (
          <>
            <h2 className={cn("heading")}>Note</h2>
            <p>
              Please connect an Ethereum provider to{" "}
              {getNetworkName(networkId)} to interact with this market.
            </p>
          </>
        ) : (
          <>
            <YourPositions
              asWrappedTransaction={asWrappedTransaction(this.props)}
            />
          </>
        )}
      </section>
    );
  }
}

export default connect(
  // @ts-ignore
  state => ({
    // @ts-ignore
    networkId: state.marketData.networkId,
    // @ts-ignore
    account: state.marketData.account,
    // @ts-ignore
    ongoingTransactionType: state.marketData.ongoingTransactionType
  }),
  dispatch => ({
    setOngoingTransactionType: bindActionCreators(
      marketDataActions.setOngoingTransactionType,
      dispatch
    )
  })
)(Positions);
