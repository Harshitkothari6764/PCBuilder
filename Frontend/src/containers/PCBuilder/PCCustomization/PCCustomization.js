import React, { Component } from 'react';
import Collapse from './Collapse/Collapse';
import classes from './PCCustomization.module.css'
// import Box from '../../../components/Box/Box'

class PCCustomization extends Component {
    state = {  }
    render() {

        if (!this.props.listOfModels || !this.props.components){
            return (<div></div>)
        }

        const classesforrow = ["row", "accordion", classes.contain]
        // console.log(this.props.listOfModels, this.props.components)

        return (
            <div className={classesforrow.join(" ")} id="collapseofhardwares">
                <p className={classes.containHead}>Customization</p>
                    {Object.keys(this.props.listOfModels).map((hardware)=>{
                        return (
                            <Collapse key={hardware} hardware={hardware} listOfModels={this.props.listOfModels[hardware]} specs={this.props.specs} components={this.props.components} onRadioButtonChange={this.props.onRadioButtonChange} />
                        );
                    })}
            </div>
        );
    }
}

export default PCCustomization;