import * as React from 'react';
import cn from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OutcomeSelection from "./outcome-selection";
import BuySection from "./buy-section";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import * as marketDataActions from "../actions/marketData";
import asWrappedTransaction from '../utils/asWrappedTransaction';
import '../style.scss';

export interface IProps {
  markets: Array<any>;
  openMarketIndex: number;
  marketSelection: Array<any>;
  probabilities: Array<any>;
  stagedProbabilities: Array<any>;
  setMarketSelection: any;
  ongoingTransactionType: Object;
  setOngoingTransactionType: Function;
}

export interface IState {
  marketData: Object;
  positionCreation: Object;
}

class PositionCreation extends React.Component<IProps, IState> {
  public render() {
    const { markets, openMarketIndex, probabilities, stagedProbabilities, marketSelection, setMarketSelection } = this.props;

    const outcomes = markets[openMarketIndex].outcomes;
    const conditionId = markets[openMarketIndex].conditionId;

    return (
      <div className="text-center">
        <Modal
          isOpen={openMarketIndex >= 0}
          toggle={() => {}}>
          <ModalHeader>Create a new Position</ModalHeader>

          <ModalBody>
            {/* <div className="form-row">
              <Button
                className="jr-btn btn-primary btn btn-success"
                onClick={() => {}}
              >
                Get 100 Nitrogen Tokens
              </Button>
            </div>
            Please click the button above to receive 100 Nitrogen (NTN) tokens. You will then be prompted with a MetaMask transaction popup. */}

            <section className={cn("selection-section")}>
              <OutcomeSelection
                {...{
                  outcomes,
                  conditionId,
                  marketSelection,
                  setMarketSelection
                }}
              />
            </section>

            <BuySection asWrappedTransaction={asWrappedTransaction(this.props)} />

          </ModalBody>

          <ModalFooter>
            <div className="jr-btn-group">
              <Button
                className="jr-btn btn-primary btn btn-success"
                onClick={() => {}}
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

export default connect(
  // @ts-ignore
  state => ({
    // @ts-ignore
    markets: state.marketData.markets,
    // @ts-ignore
    openMarketIndex: state.positionCreation.openMarketIndex,
    // @ts-ignore
    ongoingTransactionType: state.marketData.ongoingTransactionType
  }),
  dispatch => ({
    setOngoingTransactionType: bindActionCreators(
      marketDataActions.setOngoingTransactionType,
      dispatch
    )
  })
)(PositionCreation);
