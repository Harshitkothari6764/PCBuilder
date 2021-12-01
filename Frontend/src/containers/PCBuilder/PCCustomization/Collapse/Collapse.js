import React from 'react';
import 'bootstrap';
import classes from './Collapse.module.css'

const Collapse = (props) => {

    let headerid = `header${props.hardware}`;
    let collapseid = `collapse${props.hardware}`;
    // models={this.props.menu[hardware]} selectedModel={this.props.specs[hardware][0]}


    const cardClasses = ["card", [classes.card]]
    const btn_link = [classes.btn_link]

    return(
        // <div></div>
            <div className={cardClasses.join(" ")}>
                <div className="card-header" id={headerid}>
                    <div className="mb-0">
                        <div className={btn_link.join(" ")} type="button" data-toggle="collapse" data-target={`#${collapseid}`} aria-expanded="true" aria-controls={collapseid}>
                            <div className="d-flex flex-row justify-content-between">
                                <div className={classes.collapseHeader}>{props.hardware}:&nbsp;</div> <div className="">{props.specs[props.hardware][2]}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id={collapseid} onChange={(event)=>{props.onRadioButtonChange(event, props.hardware)}} className="collapse" aria-labelledby={headerid} data-parent='#collapseofhardwares'>
                    {props.listOfModels.map((model)=>{return (
                        <div key={model} className="card-body">
                            <div className={classes.item}>
                                <input type="radio" id={model} name={props.hardware} value={model} onChange={() => {}} checked={model === props.specs[props.hardware][0]}/>
                                <label htmlFor={model}>{props.components[model][1]}</label> <span className={classes.price}>$ {props.components[model][0] -  props.specs[props.hardware][1]}</span><br/>
                            </div>
                        </div>
                    );})}
                </div>
            </div>
    );
}

export default Collapse;