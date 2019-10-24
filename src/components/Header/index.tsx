import Menu from "./Menu";
import * as React from 'react';
import CurrentNetwork from './../CurrentNetwork';
import Web3Status from './../Web3Status';
import { EthAddress } from "rimble-ui";
import NetworkIndicator from "@rimble/network-indicator";
import { Link } from "react-router-dom";

export interface IProps {
  networkId: number;
}

class Header extends React.Component<IProps> {
  public render() {
    const { networkId } = this.props;
    return (
      <div className="app-main-header">
        <div className="d-flex app-toolbar align-items-center">
          <div className="app-logo-bl">
              <div className="app-logo pointer d-none d-md-block">
                  <img className="d-block d-lg-block" alt='...' src='./../../assets/images/logo.png'/>
              </div>
          </div>

          <Menu/>

          <ul className="header-notifications list-inline ml-auto">
            <li className="list-inline-item user-nav">
              <Web3Status />
            </li>
            <li className="list-inline-item user-nav">
              <Link to="/faucets" style={{color: "#868e96", textDecoration: "none"}}>Faucets</Link>
            </li>
            <li className="list-inline-item user-nav">
              <NetworkIndicator currentNetwork={networkId} requiredNetwork={4} />
              {/* <CurrentNetwork />  */}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
