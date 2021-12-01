import React from 'react';
import classes from './Speclist.module.css'
import Box from '../../../../components/Box/Box'
// import { connect } from 'react-redux'

const Speclist = (props) => {
    let sum = 0
    // console.log(props)
    
    return (
        <Box title="Specifications">
            {Object.keys(props.specs).map((hardware) => {
                sum = sum +props.specs[hardware][1];
                return (
                    <React.Fragment key={hardware}>
                        <div className={classes.specLine} key={hardware}><div>
                            <b>{hardware}:</b> <span className={classes.description}>{props.specs[hardware][2]}</span></div><span className={classes.price}>{"$ "+props.specs[hardware][1]}</span>
                        </div>
                        { props.showDes ? <div className={classes.points}><ul>{props.components[props.specs[hardware][0]][2]["points"].map((point) => <li key={point}>{point}</li>) }</ul></div> : null}
                    </React.Fragment>
                )
            })}
            { props.printSum ? <br/> : null}
            { props.printSum ? <div className={classes.sum}><b>Subtotal: </b>${sum}</div> : null}
            {props.children}
        </Box>
    )
}

// const mapStateToProps = (state) => {
//     return({

//     })
// }

export default Speclist;