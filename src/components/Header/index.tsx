import Menu from "./Menu";
import * as React from 'react';
import CurrentNetwork from './../CurrentNetwork';
import Web3Status from './../Web3Status';

class Header extends React.Component {
  public render() {
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
                <CurrentNetwork />
              </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
