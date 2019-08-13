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
                    
                    {/* <li className="nav-item">
                      <BountyModal/>
                    </li> */}
                    <li className="nav-item">
                        <Link to="/">Markets</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/positions">Positions</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/market-creation">Market Creation</Link>
                        {/* <Link to="javascript:void(0)">Oracles</Link>
                        <ul className="sub-menu">
                            <li>
                                <Link to="/app/oracles/add">
                                    <i className="zmdi zmdi-pin zmdi-hc-fw"/>
                                    <span className="nav-text">Add</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/app/oracles/mine">
                                    <i className="zmdi zmdi-filter-list zmdi-hc-fw"/>
                                    <span className="nav-text">My list</span>
                                </Link>
                            </li>
                        </ul> */}
                    </li>
                </ul>
            </div>
        );
    }
}

export default Menu;
