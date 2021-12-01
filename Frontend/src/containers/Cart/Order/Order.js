import React from 'react';
import Box from '../../../components/Box/Box'
import classes from './Order.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretRight, faCaretLeft} from '@fortawesome/free-solid-svg-icons'

const Order = (props) => {
    
    const images = require.context('../../../assets/images/case', true);
    let img = images('./' + props.order.metadata.img);

    var display = null

    if ((!!props.order.components) && (props.order.components.constructor === Array)){
        display = props.order.components.map( (component, index) => { return (<div key={index} className={classes.li}>{props.components[component['model']][1]}</div>)} )
    }else{
        display = Object.keys(props.order.components).map((component, index) => { return (<div key={index} className={classes.li}>{props.components[props.order.components[component][0]][1]}</div>) })
    }

    return (
        <Box title={props.order.metadata.model + " desktop"}>
            <div className={classes.order}>
                <img className={classes.image} src={img} alt="order1" />
                <div className={classes.specs}>
                    {display}
                </div>
                <div className={classes.information}>
                    { props.displayPrice ? <div>Subtotal: {700}</div> : null}
                    { props.displayFixedQuantity ? <div>Quantity: {1}</div> : null}
                    { props.displayQuantity ? <div className={classes.quantity}><span className={classes.text}>Quantity: </span><FontAwesomeIcon icon={faCaretLeft} className="mx-2" size="2x"/><span className={classes.text}>{1}</span><FontAwesomeIcon icon={faCaretRight} className="mx-2" size="2x"/></div> : null}
                </div>
            </div>
        </Box>
    )
}

export default Order;