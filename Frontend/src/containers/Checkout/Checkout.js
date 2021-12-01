import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from '../../components/Button/Button'
import classes from './Checkout.module.css'
import Box from '../../components/Box/Box'
import Box1 from '../../assets/images/box.jpg'
import Box2 from '../../assets/images/expressBox.jpg'
import AxiosForm from '../../axiosform'
import AxiosInstance from '../../axiosInstance'
import Order from '../Cart/Order/Order'

class Checkout extends Component{
    state = {
        shippingAdd: {
            name: "",
            email: "",
            street1: "",
            street2: "",
            city: "",
            state: "",
            country: "",
            zipcode: ""
        },
        billingAdd: {
            name: "",
            street1: "",
            street2: "",
            city: "",
            state: "",
            country: "",
            zipcode: ""
        },
        payment:{
            cardNumber: "",
            cardExp: "",
            cardCVV: ""
        },
        fastDel: false,
        tax: 13,
        components: null,
        orders: [],
        totalPrice: 0
    }

    onDelivaryChange = (event) => {
        if (event === "express"){
            this.setState({fastDel: true})
        }else{
            this.setState({fastDel: false})
        }
    }

    fillShippingAdd = (event, field)=>{
        // console.log(this.state.shippingAdd[field])
        let shippingAdd = { ...this.state.shippingAdd };
        shippingAdd[field] = event.target.value
        this.setState({ ...this.state, shippingAdd: shippingAdd});
    }

    fillBillingAdd = (event, field)=>{
        // console.log(this.state.shippingAdd[field])
        let billingAdd = { ...this.state.billingAdd };
        billingAdd[field] = event.target.value
        this.setState({ ...this.state, billingAdd: billingAdd});
    }

    fillCardNumber = (event) => {
        if(event.target.value.slice(-1) === "-"){
            let cardNumber = event.target.value.slice(0,-1)
            let payment={ ...this.state.payment , cardNumber:cardNumber}
            this.setState({...this.state, payment:payment})
            return null
        }

        let numbers = event.target.value.replaceAll('-', '')
        let isnum = /^\d+$/.test(numbers);
        if (!(isnum || event.target.value === "") || (numbers.length > 16)){
            return null
        }
        let indexD = [4,9,14]
        for (let i = 0; i < 3; i++) {
            if(numbers.length >= indexD[i]){
                numbers = numbers.slice(0,indexD[i]) + "-" + numbers.slice(indexD[i], numbers.length)
            }
        }
        let payment = { ...this.state.payment, cardNumber:numbers }
        this.setState({...this.state, payment:payment})
    }

    fillCardExp = (event) => {

        if(event.target.value.slice(-1) === "/"){
            let exp = event.target.value.slice(0,-1)
            let payment={ ...this.state.payment , cardExp:exp}
            this.setState({...this.state, payment:payment})
            return null
        }

        let numbers = event.target.value.replace('/', '')
        let isnum = /^\d+$/.test(numbers);
        if (!(isnum || event.target.value === "") || (numbers.length > 4)){
            return null
        }

        if(event.target.value.length >= 2){
            numbers = numbers.slice(0,2) + "/" + numbers.slice(2, numbers.length)
        }
        let payment={ ...this.state.payment , cardExp:numbers}
        this.setState({...this.state, payment:payment})
    }

    fillCardCVV = (event) => {
        if( event.target.value.length <= 3 ){
            let payment={ ...this.state.payment , cardCVV: event.target.value}
            this.setState({...this.state, payment:payment})
        }
    }

    finalPrice = (mes) => {

        let totalPrc = 0
        this.state.orders.map((order) => {
            totalPrc += order.price
        })
        this.setState({totalPrice: totalPrc})
    }

    placeOrder = () => {

        if(this.props.token){

            let userInformation = { shippingAdd: this.state.shippingAdd, billingAdd: this.state.billingAdd, fastDelivery: this.state.fastDel }

            const body = {
                userInformation
            }
            console.log("body ", body)

            AxiosForm({
                method: 'patch',
                url: '/order',
                data: body,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                }
            })
            .then((response) => {
                console.log(response)
                this.props.history.push({ pathname: '/orders' })
            })
            .catch((error) => {
                console.log(error)
            });
        }else{
            console.log("token is not available!")
        }
    }

    componentDidMount(){
        if(!this.props.components){
            AxiosInstance.get("/components.json").then((res) => {
                this.setState({components: res.data})
            }).catch((e) => {
                console.log("error at /components.json")
            })
        }else{
            this.setState({components: this.props.components})
        }

        if(this.props.token){
            AxiosForm({
                method: 'get',
                url: '/cart',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                }
            })
            .then((response) => {
                this.setState({orders: response.data}, this.finalPrice)
            })
            .catch((error) => {
                console.log(error)
            });
        }else{
            if(this.props.specs){
                this.setState({orders: [this.props.specs]}, this.finalPrice)
                // console.log(this.props.specs)
            }
        }
    }

    render(){
        const emptyCart = <div className={classes.empty}>Please select your orders.</div>
        // console.log(this.state.orders)

        let standardClasses = []
        let expressClasses = []

        if (this.state.fastDel){
            expressClasses.push(classes.selected)
            standardClasses = []
        }else{
            standardClasses.push(classes.selected)
            expressClasses = []
        }

        return(
            <React.Fragment>
                <div>Orders:</div>
                { this.state.orders.length > 0 && this.state.components ? this.state.orders.map((order, index) => <Order key={index} order={order} components={this.state.components} displayFixedQuantity />) : emptyCart}
                <Box title="Shipping Address">
                    <form>
                        <input className={classes.text} name="name" type="text" placeholder="Full Name" value={this.state.shippingAdd.name} onChange={(event) => this.fillShippingAdd(event, 'name')}></input>
                        <input className={classes.text} name="email" type="email" placeholder="Email ID" value={this.state.shippingAdd.email} onChange={(event) => this.fillShippingAdd(event, 'email')}></input>
                        <input className={classes.text} name="street1" type="text" placeholder="Street 1" value={this.state.shippingAdd.street1} onChange={(event) => this.fillShippingAdd(event, 'street1')}></input>
                        <input className={classes.text} name="street2" type="text" placeholder="Street 2" value={this.state.shippingAdd.street2} onChange={(event) => this.fillShippingAdd(event, 'street2')}></input>
                        <input className={classes.text} name="city" type="text" placeholder="City" value={this.state.shippingAdd.city} onChange={(event) => this.fillShippingAdd(event, 'city')}></input>
                        <input className={classes.text} name="state" type="text" placeholder="State" value={this.state.shippingAdd.state} onChange={(event) => this.fillShippingAdd(event, 'state')}></input>
                        <input className={classes.text} name="country" type="text" placeholder="Country" value={this.state.shippingAdd.country} onChange={(event) => this.fillShippingAdd(event, 'country')}></input>
                        <input className={classes.text} name="zipcode" type="text" placeholder="Zipcode" value={this.state.shippingAdd.zipcode} onChange={(event) => this.fillShippingAdd(event, 'zipcode')}></input>
                    </form>
                </Box>
                Billing address is same as Shipping address:<input type="checkbox" id="billingAddCheckbox" ></input>
                <Box title="Billing Address">
                    <form>
                        <input className={classes.text} name="name" type="text" placeholder="Full Name" onChange={(event) => this.fillBillingAdd(event, "name")}></input>
                        <input className={classes.text} name="street1" type="text" placeholder="Street 1" onChange={(event) => this.fillBillingAdd(event, "street1")}></input>
                        <input className={classes.text} name="street2" type="text" placeholder="Street 2" onChange={(event) => this.fillBillingAdd(event, "street2")}></input>
                        <input className={classes.text} name="city" type="text" placeholder="City" onChange={(event) => this.fillBillingAdd(event, "city")}></input>
                        <input className={classes.text} name="state" type="text" placeholder="State" onChange={(event) => this.fillBillingAdd(event, "state")}></input>
                        <input className={classes.text} name="country" type="text" placeholder="Country" onChange={(event) => this.fillBillingAdd(event, "country")}></input>
                        <input className={classes.text} name="zipcode" type="text" placeholder="Zipcode" onChange={(event) => this.fillBillingAdd(event, "zipcode")}></input>
                    </form>
                </Box>
                <Box title="Delivery">
                    <div className={standardClasses.join(" ")} onClick={() => this.onDelivaryChange("standard")} ><img className={classes.box} src={Box1} alt="Standard Delivery" /> Standard Delivery </div>
                    <div className={expressClasses.join(" ")} onClick={() => this.onDelivaryChange("express")}><img className={classes.box} src={Box2} alt="Express Delivery" /> Express Delivery </div>
                </Box>
                <Box title="Payment">
                    <input className={classes.text} name="cardNumber" type="text" placeholder="Card Number" value={this.state.payment.cardNumber} onChange={(event) => this.fillCardNumber(event)}></input>
                    <input className={classes.text} name="cardExp" type="text" placeholder="Expiry Date (MM/YY)" value={this.state.payment.cardExp} onChange={ (event) => this.fillCardExp(event) }></input>
                    <input className={classes.text} name="cardCVV" type="password" placeholder="CVV" value={this.state.payment.cardCVV} onChange={ (event) => this.fillCardCVV(event) }></input>
                </Box>
                <Box title="Billing">
                    <div>Subtotal: <span>${ Math.round(this.state.totalPrice * 10) / 10 }</span></div>
                    <div>Discount: <span>${ Math.round(-this.state.totalPrice) / 10 } 10%</span></div>
                    <div>Shipping: <span>${ this.state.fastDel ? 50 : 0 } </span></div>
                    <div>Tax: <span>${Math.round(this.state.totalPrice*0.13 * 10) / 10} </span></div>
                    <div>Total: <span>${ this.state.fastDel ? Math.round((this.state.totalPrice - this.state.totalPrice*0.1 + this.state.totalPrice*0.13 + 50) * 10) / 10 : Math.round((this.state.totalPrice - this.state.totalPrice*0.1 + this.state.totalPrice*0.13) * 10) / 10} </span></div>
                    <Button text="Buy" clicked={this.placeOrder} />
                </Box>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return ({
        specs: state.Specifications,
        token: state.token,
        components: state.components
    })
}

export default connect(mapStateToProps, null)(Checkout);