import React from 'react';
import classes from './Box.module.css';

const Box = (props) => {
    return (
        <div className={classes.contain}>
            <p className={classes.containHead}>{props.title}</p>
            {props.children}
        </div>
    )
}

export default Box;