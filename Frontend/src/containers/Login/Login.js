import React, { Component } from 'react';
import classes from './Login.module.css'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'

class Login extends Component{

    state = {
        signupToggle: true
    }

    handleClickSignup = () => {
        this.setState({ signupToggle: true })
    }

    handleClickSignin = () => {
        this.setState({ signupToggle: false })
    }

    render(){
        return(
            <div className={classes.contain}>
                <div className={classes.card}>
                    { this.state.signupToggle ? <SignUp clickOnSignin={this.handleClickSignin} clickOnSignup={this.handleClickSignup} /> : <SignIn clickOnSignup={this.handleClickSignup} clickOnSignin={this.handleClickSignin} /> }
                </div>
            </div>
        )
    }
}

export default Login;