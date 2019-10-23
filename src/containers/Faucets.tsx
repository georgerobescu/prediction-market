import React from "react";
import { Input } from "rimble-ui";
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import Web3 from 'web3';

export interface IProps {
  transactionStack: any;
  transactions: any;
}

class Faucets extends React.Component<IProps> {
  input;
  constructor(props) {
    super(props);
    // @ts-ignore
    this.input = React.createRef();
  }
  public render() {
    const {transactionStack, transactions} = this.props;

    console.log("**********");
    console.log(transactions[transactionStack[0]]);
    return (
      <>
        <div className="row">
          <div className="offset-sm-3 col-sm-6 pb-4">
            <h2 className="font-weight-light">Rinkeby Ether Faucet</h2>
            <p className="card-text">
              <a href="https://faucet.rinkeby.io/" target="_BLANK">
                <button
                  className="jr-btn jr-btn-default text-uppercase btn-block btn btn-default"
                >
                  <span>Get Ether</span>
                </button>
              </a>
            </p>
          </div>

          <div className="offset-sm-3 col-sm-6 pb-4">
            <h2 className="font-weight-light">Get Test DAI</h2>
            {(transactionStack.length === 0) && (
              <p className="card-text">
                <Input placeholder="0x0000000000000000000000000000000000000000" required={true} ref={this.input} className="col-sm-12" />
                <button
                  className="jr-btn jr-btn-default text-uppercase btn-block btn btn-default mt-1"
                  onClick={async () => {
                    const stackId = this.context.drizzle.contracts.DaiStandin.methods.mint.cacheSend(Web3.utils.toChecksumAddress(this.input.current.value), 100000000000000000000);
                    
                    console.log("Stack ID:");
                    console.log(stackId);
                  }}
                >
                  <span>Get 100 DAI</span>
                </button>
              </p>
            )}
            {(transactionStack.length > 0) && (
              <p className="card-text">
                Faucet Transaction Status: {(!!transactions[transactionStack[0]]) && transactions[transactionStack[0]].status}
              </p>
            )}
          </div>
        </div>
      </>
    );
  }
};

// @ts-ignore
Faucets.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    transactionStack: state.transactionStack,
    transactions: state.transactions
  }
}

export default drizzleConnect(Faucets, mapStateToProps, dispatch => ({
  // setNetworkId: bindActionCreators(marketDataActions.setNetworkId, dispatch)
}));
