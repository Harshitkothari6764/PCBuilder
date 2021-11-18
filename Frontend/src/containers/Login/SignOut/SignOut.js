import { connect } from 'react-redux'
import AxiosForm from '../../../axiosform'

const SignOut = (props) => {
    AxiosForm({
        method: 'post',
        url: '/user/logout',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': props.token
        }
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error.response)
    });

    props.logout()
    props.history.push('/Products')
    return null
}

const mapStateToProps = state => {
    return ({
        token: state.token
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        logout: () => dispatch({ type: "logout" })
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);