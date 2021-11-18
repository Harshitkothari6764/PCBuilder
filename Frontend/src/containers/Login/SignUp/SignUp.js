import React, { Component } from 'react';
import classes from './SignUp.module.css'
import Button from '../../../components/Button/Button'
import axios from '../../../axiosform'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

class SignUp extends Component{

    state = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
        token: "",
        classesForPassword: [classes.textInput],
        classesForConfirmPassword: [classes.textInput],
        canSubmit: false,
        duplicateEmail: false,
        simpleError: false
    }

    handleForm = (event, field) => {
        this.setState({[field]: event.target.value, simpleError: false}, this.canSubmitHandler)
    }

    errorCheckerForPassword = (value) => {
        if (value.length < 7){
            const passwordClasses = [...this.state.classesForPassword]
            passwordClasses.push(classes.error)
            this.setState({classesForPassword: passwordClasses})
        }else{
            this.setState({classesForPassword: [classes.textInput]})
            this.errorCheckerForConfirmPassword(this.state.confirmPassword)
        }
    }

    errorCheckerForConfirmPassword = (value) => {
        if (value !== this.state.password){
            const passwordClasses = [...this.state.classesForConfirmPassword]
            passwordClasses.push(classes.error)
            this.setState({classesForConfirmPassword: passwordClasses})
        }else{
            this.setState({classesForConfirmPassword: [classes.textInput]})
        }
    }

    canSubmitHandler = () => {
        if (this.state.fname !== "" && this.state.lname !== "" && this.state.email !== "" && this.state.password.length > 6 && this.state.confirmPassword === this.state.password){
            this.setState({canSubmit: true})
        }else{
            this.setState({canSubmit: false})
        }
    }

    onSubmit = () => {
        if (this.state.canSubmit){
            const body = {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                password: this.state.password
            }
            axios({
                method: 'post',
                url: '/user',
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
                console.log(error)
                if ( error.response && error.response.statusText === "11000"){
                    this.setState({ duplicateEmail: true })
                }
            });
        }else{
            this.setState({ simpleError: true })
        }
    }

    constructor(props){
        super(props)
        if (this.props.token){
            this.state.token = this.props.token
        }
    }

    render() {
        return(
            <div className={classes.contain}>
                <div className={classes.title}>
                    <span onClick={this.props.clickOnSignup}>Sign up</span> | <span onClick={this.props.clickOnSignin} >Sign in</span>
                </div>
                <input className={classes.textInput} value={this.state.fname} type="text" placeholder="First Name" onChange={ (event) => this.handleForm(event, "fname") } />
                <input className={classes.textInput} value={this.state.lname} type="text" placeholder="Last Name" onChange={ (event) => this.handleForm(event, "lname") } />
                <input className={classes.textInput} value={this.state.email} type="text" placeholder="Email"  onChange={ (event) => {this.handleForm(event, "email"); this.setState({ duplicateEmail: false })} } />
                <p className={classes.msg}>For testing, enter any unique string as email.</p>
                <input className={this.state.classesForPassword.join(" ")} value={this.state.password} type="password" placeholder="Password" onChange={ (event) => {this.handleForm(event, "password"); this.errorCheckerForPassword(event.target.value)} } />
                <input className={this.state.classesForConfirmPassword.join(" ")} value={this.state.confirmPassword} type="password" placeholder="Confirm Password" onChange={ (event) => {this.handleForm(event, "confirmPassword"); this.errorCheckerForConfirmPassword(event.target.value)} } />
                <Button text="Sign Up" clicked={this.onSubmit} />
                { this.state.duplicateEmail ? <p className={classes.errorMsg}>Email ID is duplicate.</p> : null }
                { this.state.simpleError ? <p className={classes.errorMsg}>Error!</p> : null }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));