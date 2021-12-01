import React, { Component } from 'react';
import Order from './Order/Order'
import { connect } from 'react-redux'
import Button from '../../components/Button/Button'
import classes from './cart.module.css'
import Axios from '../../axiosform'
import AxiosInstance from '../../axiosInstance'

class Cart extends Component{
    state = {
        orders: [],
        components: null
        // *********************** remove tempSpecs and put everything into orders
    }


    // ****************************

        ////////        add specs to orders[0].components

    // ****************************

    // constructor(props){
    //     super(props)
    //     if(this.props.specs){
    //         this.state.tempSpecs = this.props.specs.components
    //     }
    // }

    checkoutButton = () => {
        this.props.history.push({
            pathname: '/checkout'
        })
    }

    componentDidMount(){
        if(this.props.token){
            Axios({
                method: 'get',
                url: '/cart',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                }
            })
            .then((response) => {
                this.setState({orders: response.data})
                if(!this.props.components){
                    AxiosInstance.get("/components.json").then((res) => {
                        this.setState({components: res.data})
                    }).catch((e) => {
                        console.log("error at /components.json")
                    })
                }else{
                    this.setState({components: this.props.components})
                }
            })
            .catch((error) => {
                console.log(error)
            });
        }else{
            if(this.props.specs){
                this.setState({orders: [this.props.specs]})
                console.log(this.props.specs)
            }
            if(!this.props.components){
                AxiosInstance.get("/components.json").then((res) => {
                    this.setState({components: res.data})
                }).catch((e) => {
                    console.log("error at /components.json")
                })
            }else{
                this.setState({components: this.props.components})
            }
        }
    }

    render(){

        const emptyCart = <div className={classes.empty}> Your cart is empty. Checkout our Products.</div>
        const productsButton = <div className={classes.empty}><br/><Button text="Products" clicked={ () => this.props.history.push({ pathname: '/Products' })} /> </div>
        // console.log("check", this.state.orders.length, this.state.components)
        return(
            <React.Fragment>
                <div>
                    <div>Your Orders</div>
                    { this.state.orders.length > 0 && this.state.components ? this.state.orders.map((order, index) => <Order key={index} order={order} components={this.state.components} displayPrice displayQuantity />) : emptyCart}
                </div>
                <div>
                    { this.state.orders.length > 0  && this.state.components ? <Button text="Checkout" clicked={this.checkoutButton} /> : productsButton}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        specs: state.Specifications,
        token: state.token,
        components: state.components
    })
}

const mapDispatchToProps = (Dispatch) => {
    return({})
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);