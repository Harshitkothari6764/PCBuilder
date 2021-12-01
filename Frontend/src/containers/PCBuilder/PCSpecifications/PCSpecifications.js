import React from 'react';
import classes from './PCSpecifications.module.css'
import Button from '../../../components/Button/Button'
import { withRouter } from 'react-router-dom';
import Speclist from './Speclist/Speclist';

const PCSpecifications = (props) => {

    return(
        <Speclist printSum showDes components={props.components} specs={props.specs}>
            <div className={classes.button}>
                <Button text="Add to Cart" clicked={props.submitSpecs}></Button>
            </div>
        </Speclist>
    );
}

export default withRouter(PCSpecifications);