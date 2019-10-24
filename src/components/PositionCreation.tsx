import web3 from 'web3';
import * as React from 'react';
import cn from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OutcomeSelection from "./outcome-selection";
import BuySection from "./buy-section";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import * as marketDataActions from "../actions/marketData";
import * as positionCreationActions from "../actions/positionCreation";
import asWrappedTransaction from '../utils/asWrappedTransaction';
import '../style.scss';
import { drizzleConnect } from 'drizzle-react';

export interface IProps {
  markets: Array<any>;
  openMarketIndex: number;
  marketSelection: Array<any>;
  probabilities: Array<any>;
  stagedProbabilities: Array<any>;
  setMarketSelection: any;
  ongoingTransactionType: Object;
  setOngoingTransactionType: Function;
  setOpenMarketIndex: Function;
  newlyCreatedTxn: any;
  setNewlyCreatedTxn: Function;
  ChainlinkEcoTreeContract: any;
  chainlinkEcoTreeKeys: any;
}

export interface IState {
  marketData: Object;
  positionCreation: Object;
}

class PositionCreation extends React.Component<IProps, IState> {
  closeModal = () => {
    const { setOpenMarketIndex, setNewlyCreatedTxn } = this.props;

    setOpenMarketIndex(-1);
    setNewlyCreatedTxn(null);
  }
  public render() {
    const { markets, openMarketIndex, probabilities, stagedProbabilities, marketSelection, setMarketSelection, newlyCreatedTxn, ChainlinkEcoTreeContract, chainlinkEcoTreeKeys } = this.props;

    const outcomes = markets[openMarketIndex].outcomes;
    const conditionId = markets[openMarketIndex].conditionId;
    const rawTitle = markets[openMarketIndex].title;
    const title = rawTitle.replace("{name}", '"' + web3.utils.hexToUtf8(ChainlinkEcoTreeContract.forests[chainlinkEcoTreeKeys[openMarketIndex]].value.description) + '"');

    return (
      <div className="text-center">
        <Modal
          isOpen={openMarketIndex >= 0}
          toggle={this.closeModal}>
          <ModalHeader>Create a new Position</ModalHeader>

          <ModalBody>

            <div className="jr-card bg-white border-0 p-0 m-0">

              <div className="jr-card-header">
                <h3 className="card-heading">
                  <span>{title}</span>
                </h3>
              </div>

              <div className="jr-card-body">

                {(newlyCreatedTxn === null) &&
                  <div className="row">
                    <div className={cn("outcome-selection") + " col-0 col-md-3"} />
                    <div className={cn("outcome-selection") + " col-12 col-md-6"}>
                      <OutcomeSelection
                        {...{
                          outcomes,
                          conditionId,
                          marketSelection,
                          setMarketSelection
                        }}
                      />
                      <BuySection asWrappedTransaction={asWrappedTransaction(this.props)} />
                    </div>
                  </div>
                }

                {(newlyCreatedTxn !== null) &&
                  <>
                    Success! Your position has been created. Txn: {newlyCreatedTxn.tx}
                  </>
                }

              </div>
            </div>

          </ModalBody>

          <ModalFooter>
            <div className="jr-btn-group">
              <Button
                className="jr-btn btn-primary btn btn-success mb-0"
                onClick={this.closeModal}
              >
                Close
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default drizzleConnect(
  PositionCreation,
  // @ts-ignore
  state => ({
    // @ts-ignore
    markets: state.marketData.markets,
    // @ts-ignore
    openMarketIndex: state.positionCreation.openMarketIndex,
    // @ts-ignore
    ongoingTransactionType: state.marketData.ongoingTransactionType,
    // @ts-ignore
    newlyCreatedTxn: state.positionCreation.newlyCreatedTxn,
    // @ts-ignore
    ChainlinkEcoTreeContract: state.contracts.ChainlinkEcoTree,
    // @ts-ignore
    chainlinkEcoTreeKeys: state.contractFieldKeys.chainlinkEcoTreeKeys
  }),
  dispatch => ({
    setOngoingTransactionType: bindActionCreators(
      marketDataActions.setOngoingTransactionType,
      dispatch
    ),
    setOpenMarketIndex: bindActionCreators(
      positionCreationActions.setOpenMarketIndex,
      dispatch
    ),
    setNewlyCreatedTxn: bindActionCreators(
      positionCreationActions.setNewlyCreatedTxn,
      dispatch
    )
  })
);
