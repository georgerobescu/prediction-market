import * as React from 'react';
import cn from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as marketDataActions from "../actions/marketData";
import BuySection from "../components/buy-section";
import YourPositions from "../components/your-positions";
import { getNetworkName } from "../utils/web3-helpers.js";
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
  asWrappedTransaction = (wrappedTransactionType, transactionFn, setError) => {
    return async () => {
      const { ongoingTransactionType, setOngoingTransactionType } = this.props;

      if (ongoingTransactionType !== null) {
        throw new Error(
          `Attempted to ${wrappedTransactionType} while transaction to ${ongoingTransactionType} is ongoing`
        );
      }

      try {
        setOngoingTransactionType(wrappedTransactionType);
        await transactionFn();
      } catch (e) {
        setError(e);
        throw e;
      } finally {
        setOngoingTransactionType(null);
        // triggerSync();
      }
    };
  };

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
            <h2 className={cn("heading")}>Manage Positions</h2>
            <BuySection asWrappedTransaction={this.asWrappedTransaction} />
            <YourPositions
              asWrappedTransaction={this.asWrappedTransaction}
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
