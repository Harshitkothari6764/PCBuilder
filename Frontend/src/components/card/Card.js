import React from 'react';
import classes from './Card.module.css'
import Button from '../Button/Button'
import { withRouter } from 'react-router-dom'

const Card = (props) => {

    // console.log(props.des)
    const images = require.context('../../assets/images/case', true);
    let img = images('./' + props.img);

    const cardClasses = [classes.card]
    const imageClasses = [classes.img]
    const bodyClasses = [classes.body]
    const ele = [classes.ele]

    const toCustomize = () => {
        props.history.push({
            pathname: '/',
            search: '?model='+props.uniqueName
        })
    }

    return (
        <div className={cardClasses.join(" ")}>
            <img className={imageClasses.join(" ")} src={ img } alt="Card cap" />
            <div className={bodyClasses.join(" ")}>
                <h4 className={ele}>{props.title}</h4>
                <h5 className={ele}>Starts at: $ {props.price}</h5>
                <div className={ele}>
                    {Object.keys(props.des).map( point => <div key={props.des[point]}>{props.des[point]}</div> )}
                </div>
                <div className={classes.btn}>
                    <Button text="Learn More" clicked={toCustomize} />
                </div>
            </div>
        </div>
    )
}

export default withRouter(Card);