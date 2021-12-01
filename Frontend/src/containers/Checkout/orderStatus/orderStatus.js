import React, {Component} from 'react'
import { connect } from 'react-redux';
import AxiosForm from '../../../axiosform'
import AxiosInstance from '../../../axiosInstance'
import Order from '../../Cart/Order/Order'

class orderStatus extends Component{

    state = {
        components: null,
        orders: []
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
                url: '/getOrders',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                }
            })
            .then((response) => {
                this.setState({orders: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
        }else{
            if(this.props.specs){
                this.setState({orders: [this.props.specs]})
                // console.log(this.props.specs)
            }
        }
    }

    constructor(props){
        super(props)
        this.state.components = this.props.components
    }

    render(){
        const emptyCart = "There are no orders to display."
        return(
            <div>
                <div>Orders:</div>
                { this.state.orders.length > 0 && this.state.components ? this.state.orders.map((order, index) => {
                    return <div key={index}>
                        Order {index}:
                        {order.items.length > 0 ?
                            order.items.map((item, index2) => <Order key={index2} order={item} components={this.state.components} displayFixedQuantity />)
                        : null}
                    </div>
                }) : emptyCart}
            </div>
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

export default connect(mapStateToProps, null)(orderStatus);