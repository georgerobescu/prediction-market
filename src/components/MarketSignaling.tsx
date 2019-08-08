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
}

export interface IState {
  marketData: Object;
  positionCreation: Object;
}

class MarketSignaling extends React.Component<IProps, IState> {
  closeModal = () => {
    const { setOpenMarketIndex, setNewlyCreatedTxn } = this.props;

    setOpenMarketIndex(-1);
    setNewlyCreatedTxn(null);
  }
  public render() {
    const { markets, openMarketIndex, probabilities, stagedProbabilities, marketSelection, setMarketSelection, newlyCreatedTxn } = this.props;

    // const outcomes = markets[openMarketIndex].outcomes;
    // const conditionId = markets[openMarketIndex].conditionId;
    // const title = markets[openMarketIndex].title;

    return (
      <div className="text-center">
        <Modal
          isOpen={openMarketIndex >= 100}
          toggle={this.closeModal}>
          <ModalHeader>Signal Your Support for a Future Market on {"this"} Dataset</ModalHeader>

          <ModalBody>

            <div className="jr-card bg-white border-0 p-0 m-0">

              <div className="jr-card-header">
                <h3 className="card-heading">
                  <span>Epicéa de Sitka (Coadou) - 1ere parcelle Dataset</span>
                </h3>
              </div>

              <div className="jr-card-body">

                {true &&
                  <div className="row">
                    <div className={cn("outcome-selection") + " col-0 col-md-3"} />
                    <div className={cn("outcome-selection") + " col-12 col-md-6"}>
                      {/*<OutcomeSelection
                        {...{
                          outcomes,
                          conditionId,
                          marketSelection,
                          setMarketSelection
                        }}
                      />*/}
                      {/*<BuySection asWrappedTransaction={asWrappedTransaction(this.props)} />*/}
                    </div>
                  </div>
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
  MarketSignaling,
  // @ts-ignore
  state => ({
    // @ts-ignore
    markets: state.marketData.markets,
    // @ts-ignore
    openMarketIndex: state.positionCreation.openMarketIndex,
    // @ts-ignore
    ongoingTransactionType: state.marketData.ongoingTransactionType,
    // @ts-ignore
    newlyCreatedTxn: state.positionCreation.newlyCreatedTxn
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
