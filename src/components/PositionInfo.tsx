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
  openInfoIndex: number;
  setOpenInfoIndex: Function;
  ChainlinkEcoTreeContract: any;
  chainlinkEcoTreeKeys: any;
  setOpenInfoData: Function;
  openInfoData: any;
}

export interface IState {
  marketData: Object;
  positionCreation: Object;
}

class PositionInfo extends React.Component<IProps, IState> {
  public async componentWillMount() {
    const { openInfoIndex, setOpenInfoData } = this.props;

    const response = await fetch('http://private-486b5-leopoldjoy.apiary-mock.com/forests/' + openInfoIndex);
    if (response.ok) {
      const json = await response.json();
      setOpenInfoData(json);
    } else {
      console.error("HTTP-Error: " + response.status);
    }
  }
  closeModal = () => {
    const { setOpenInfoIndex } = this.props;

    setOpenInfoIndex(-1);
  }
  public render() {
    const { markets, openInfoIndex, ChainlinkEcoTreeContract, chainlinkEcoTreeKeys, openInfoData } = this.props;

    const rawTitle = markets[openInfoIndex].title;
    const title = rawTitle.replace("{name}", '"' + web3.utils.hexToUtf8(ChainlinkEcoTreeContract.forests[chainlinkEcoTreeKeys[openInfoIndex]].value.description) + '"');

    return (
      <div className="text-center">
        <Modal
          isOpen={openInfoIndex >= 0}
          toggle={this.closeModal}>
          <ModalHeader>Market Information</ModalHeader>

          <ModalBody>

            <div className="jr-card bg-white border-0 p-0 m-0">

              <div className="jr-card-header">
                <h3 className="card-heading">
                  <span>{title}</span>
                </h3>
              </div>

              <div className="jr-card-body">
                <div className="row">
                  <div className={cn("outcome-selection") + " col-0 col-md-3"} />
                  <div className={cn("outcome-selection") + " col-10 offset-1"}>
                    <pre>
                      {JSON.stringify(openInfoData, null, 4)}
                    </pre>
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
  PositionInfo,
  // @ts-ignore
  state => ({
    // @ts-ignore
    markets: state.marketData.markets,
    // @ts-ignore
    openInfoIndex: state.positionCreation.openInfoIndex,
    // @ts-ignore
    ChainlinkEcoTreeContract: state.contracts.ChainlinkEcoTree,
    // @ts-ignore
    chainlinkEcoTreeKeys: state.contractFieldKeys.chainlinkEcoTreeKeys,
    // @ts-ignore
    openInfoData: state.positionCreation.openInfoData
  }),
  dispatch => ({
    setOpenInfoIndex: bindActionCreators(
      positionCreationActions.setOpenInfoIndex,
      dispatch
    ),
    setOpenInfoData: bindActionCreators(
      positionCreationActions.setOpenInfoData,
      dispatch
    )
  })
);
