import React from 'react';
import classes from './Button.module.css'

const Button = (props) => {

    const buttonClasses = [classes.btn , classes.hover_filled_opacity]

    return(
        <button className={buttonClasses.join(" ")} onClick={props.clicked}>
            <span>{props.text}</span>
        </button>
    )
}

export default Button;