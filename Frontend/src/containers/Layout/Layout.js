import React, { Component } from 'react';
import Aux from '../../hoc/auxiliry';
import Navbar from './Navbar/Navbar';

class Layout extends Component {
    state = {  }
    render() { 
        return (
        <Aux>
            <Navbar/>
            {this.props.children}
        </Aux>
        );
    }
}
 
export default Layout;