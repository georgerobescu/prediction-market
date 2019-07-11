import * as React from 'react';
// import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
// import AboutModal from './../AboutModal';
// import BountyModal from './../BountyModal';


class Menu extends React.Component {
    public render() {
        return (
            <div className="app-main-menu d-none d-md-block">
                <ul className="navbar-nav navbar-nav-mega">
                    
                    {/* <li className="nav-item">
                      <BountyModal/>
                    </li> */}
                    <li className="nav-item">
                        <a href="/#/">Markets</a>
                    </li>
                    <li className="nav-item">
                        <a href="/#/positions">Positions</a>
                        {/* <a href="javascript:void(0)">Oracles</a>
                        <ul className="sub-menu">
                            <li>
                                <a href="/app/oracles/add">
                                    <i className="zmdi zmdi-pin zmdi-hc-fw"/>
                                    <span className="nav-text">Add</span>
                                </a>
                            </li>
                            <li>
                                <a href="/app/oracles/mine">
                                    <i className="zmdi zmdi-filter-list zmdi-hc-fw"/>
                                    <span className="nav-text">My list</span>
                                </a>
                            </li>
                        </ul> */}
                    </li>
                </ul>
            </div>
        );
    }
}

export default Menu;
