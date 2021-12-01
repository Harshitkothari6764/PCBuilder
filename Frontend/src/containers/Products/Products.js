import React, { Component } from 'react';
import classes from './Products.module.css'
import AxiosInstance from '../../axiosInstance'
import Card from '../../components/Card/Card'
import { connect } from 'react-redux'

class Products extends Component{

    state = {
        cats: []
    }

    componentDidMount() {

        AxiosInstance("/desktops.json").then((res) => {
            this.setState({cats: res.data});
        })
        .catch((e) => {
            console.log(e)
            console.log("error in /desktops.json request");
        })
    }

    render(){
        // console.log(this.props.token)
        return(
            <div>
                <div className={classes.cardsContainer}>
                    {Object.keys(this.state.cats).map( cat => { return (<Card key={cat} className=""  uniqueName={cat} title={this.state.cats[cat]["description"]["name"]} price={this.state.cats[cat]["description"]["val"]} img={this.state.cats[cat]["description"]["img"]} des={this.state.cats[cat]["description"]["baseModel"]} />) })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return({
        token: state.token
    })
}

// const mapDispatchToProps = dispatch => {
//     return ({
//         selectProduct: (product) => dispatch({ type: "SET_PRD", product })
//     })
// }

export default connect(mapStateToProps, null)(Products);