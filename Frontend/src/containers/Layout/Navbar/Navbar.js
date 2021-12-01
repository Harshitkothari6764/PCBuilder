import React from 'react';
import 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import classes from './Navbar.module.css'

const Navbar = (props) => {

    var name = null;

    if (props.token){
        var tokenString = Buffer.from(props.token.split('.')[1], 'base64').toString()
        name = JSON.parse(tokenString)['name']
    }
    
    return (
        <header className="header_area">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/ef">PC Builder</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        {/* <a className="nav-link" href="/Products">Home <span className="sr-only">(current)</span></a> */}
                        <NavLink className="nav-link" to="/Products">Home</NavLink>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" href="/Products">Products</a>
                    </li> */}
                    <li className="nav-item">
                        {/* <a className="nav-link" href="/idl">Support</a> */}
                        <NavLink className="nav-link" to="/orders">Orders</NavLink>
                    </li>
                    <li className="nav-item my-lg-0">
                        <a className="nav-link" href="/sdf">About us</a>
                    </li>
                </ul>
                <div className="my-2 my-lg-0">
                    <ul className="navbar-nav">
                        <li className="nav-item my-lg-0">
                            { props.token ? <NavLink className="nav-link" to="/Logout">Logout</NavLink> : <NavLink className="nav-link" to="/Login">Login</NavLink>}
                        </li>
                        <NavLink to="/Cart" className="nav-link my-lg-0"><FontAwesomeIcon icon={faShoppingCart} className="mx-2" size="2x"/></NavLink>
                        {/* <li className="nav-item my-lg-0"><FontAwesomeIcon icon={faUser} className="mx-2" size="2x"/></li> */}
                        {name ? <li className={classes.name}>Hi, {name}</li> : null}
                    </ul>
                    
                    
                </div>
            </div>
            </nav>
        </header>
    );
}

const mapStateToProps = state => {
    return ({
        token: state.token
    })
}

export default connect(mapStateToProps, null)(Navbar);