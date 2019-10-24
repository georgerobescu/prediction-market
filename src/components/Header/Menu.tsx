import * as React from 'react';
// import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
// import AboutModal from './../AboutModal';
// import BountyModal from './../BountyModal';
import { Link } from "react-router-dom";


class Menu extends React.Component {
  public render() {
    return (
      <div className="app-main-menu d-none d-md-block">
        <ul className="navbar-nav navbar-nav-mega">
          <li className="nav-item">
            <Link to="/">Markets</Link>
          </li>
          <li className="nav-item">
            <Link to="/positions">Positions</Link>
          </li>
          <li className="nav-item">
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;
