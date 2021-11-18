import React, {Component} from 'react';
import classes from './SignIn.module.css'
import Button from '../../../components/Button/Button'
import axios from '../../../axiosform'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class SignIn extends Component{

    state = {
        email: "",
        password: "",
        canSubmit: false,
        simpleError: false,
        errorMsg: false
    }

    handleForm = (event, field) => {
        this.setState({[field]: event.target.value, simpleError: false, errorMsg: false}, this.canSubmitHandler)
    }

    canSubmitHandler = () => {
        if(this.state.email !== "" && this.state.password !== ""){
            this.setState({canSubmit: true})
        }
        else{
            this.setState({canSubmit: false})
        }
    }

    onSubmit = () => {
        if (this.state.canSubmit){
            const body = {
                email: this.state.email,
                password: this.state.password
            }
            axios({
                method: 'post',
                url: '/user/login',
                data: body,
                headers: {'Content-Type': 'application/json' }
            })
            .then((response) => {
                // console.log(response.data.token);
                this.setState({token: response.data.token})
                this.props.submitToken(response.data.token)
                this.props.history.push({
                    pathname: '/Products'
                })
            })
            .catch((error) => {
                // console.log(error.response)
                if ( error.response && error.response.status === 400){
                    this.setState({ errorMsg: true })
                }
            });
        }else{
            this.setState({ simpleError: true })
        }
    }

    render() {
        return(
            <div className={classes.contain}>
                <div className={classes.title}>
                    <span onClick={this.props.clickOnSignup}>Sign up</span> | <span onClick={this.props.clickOnSignin}>Sign in</span>
                </div>
                <input className={classes.textInput} type="text" value={this.state.email} placeholder="Email" onChange={(event) => this.handleForm(event, "email")} required />
                <input className={classes.textInput} type="password" value={this.state.password} placeholder="Password" onChange={(event) => this.handleForm(event, "password")} required />
                <Button clicked={this.onSubmit} text="Sign In" />
                { this.state.simpleError ? <p className={classes.errorMsg}>Error!</p> : null }
                { this.state.errorMsg ? <p className={classes.errorMsg}>Wrong email ID or password.</p> : null }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return ({
        token: state.token
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        submitToken: (token) => dispatch({ type: "ADD_TKN", token })
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn))