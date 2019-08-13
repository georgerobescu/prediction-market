import * as React from 'react';
import cn from "classnames";
import web3 from "web3";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OutcomeSelection from "./outcome-selection";
import BuySection from "./buy-section";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import * as marketDataActions from "../actions/marketData";
import * as positionCreationActions from "../actions/positionCreation";
import * as marketCreationActions from "../actions/marketCreation";
import asWrappedTransaction from '../utils/asWrappedTransaction';
import '../style.scss';
import { drizzleConnect } from 'drizzle-react';

export interface IProps {
  markets: Array<any>;
  openCreationIndex: number;
  marketSelection: Array<any>;
  probabilities: Array<any>;
  stagedProbabilities: Array<any>;
  setMarketSelection: any;
  ongoingTransactionType: Object;
  setOngoingTransactionType: Function;
  newlyCreatedTxn: any;
  setNewlyCreatedTxn: Function;
  setOpenCreationIndex: Function;
  ChainlinkEcoTreeContract: any;
  chainlinkEcoTreeKeys: any;
}

export interface IState {
  marketData: Object;
  positionCreation: Object;
}

class MarketCreationDialog extends React.Component<IProps, IState> {
  closeModal = () => {
    const { setOpenCreationIndex, setNewlyCreatedTxn } = this.props;

    setOpenCreationIndex(-1);
    setNewlyCreatedTxn(null);
  }
  public render() {
    const { markets, openCreationIndex, probabilities, stagedProbabilities, marketSelection, setMarketSelection, newlyCreatedTxn, ChainlinkEcoTreeContract, chainlinkEcoTreeKeys } = this.props;

    // const outcomes = markets[openCreationIndex].outcomes;
    // const conditionId = markets[openCreationIndex].conditionId;
    // const title = markets[openCreationIndex].title;

    return (
      <div className="text-center">
        <Modal
          isOpen={openCreationIndex >= 0}
          toggle={this.closeModal}>
          <ModalHeader>Create a {"New"} Market from {"This"} Dataset - UNDER CONSTRUCTION</ModalHeader>

          <ModalBody>

            <div className="jr-card bg-white border-0 p-0 m-0">

              <div className="jr-card-header">
                <h3 className="card-heading">
                  <span>
                    {web3.utils.toAscii(ChainlinkEcoTreeContract.forests[chainlinkEcoTreeKeys[openCreationIndex]].value.description)}
                  </span>
                </h3>
              </div>

              <div className="jr-card-body">

                <div className="row">
                  <div className={cn("outcome-selection") + " col-12"}>
                    Forest ID: {web3.utils.toAscii(ChainlinkEcoTreeContract.forests[chainlinkEcoTreeKeys[openCreationIndex]].value.id)}
                  </div>
                  <div className={cn("outcome-selection") + " col-12"}>
                    Emissions ID: {web3.utils.toAscii(ChainlinkEcoTreeContract.forests[chainlinkEcoTreeKeys[openCreationIndex]].value.essence_id)}
                  </div>
                  <div className={cn("outcome-selection") + " col-12"}>
                    Parcel ID: {web3.utils.toAscii(ChainlinkEcoTreeContract.forests[chainlinkEcoTreeKeys[openCreationIndex]].value.parcelle_id)}
                  </div>
                  <div className={cn("outcome-selection") + " col-12"}>
                    Date Planted: {web3.utils.toAscii(ChainlinkEcoTreeContract.forests[chainlinkEcoTreeKeys[openCreationIndex]].value.date_plantation)}
                  </div>
                </div>

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
  MarketCreationDialog,
  // @ts-ignore
  state => ({
    // @ts-ignore
    markets: state.marketData.markets,
    // @ts-ignore
    openCreationIndex: state.marketCreation.openCreationIndex,
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
    setOpenCreationIndex: bindActionCreators(
      marketCreationActions.setOpenCreationIndex,
      dispatch
    ),
    setNewlyCreatedTxn: bindActionCreators(
      positionCreationActions.setNewlyCreatedTxn,
      dispatch
    )
  })
);
