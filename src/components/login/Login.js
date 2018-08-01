import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginAction from '../../action/LoginAction';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            status: ''
        };
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid bg-info text-white text-center">Welcome to MyWorkStatus</div>
                <div>
                    <input type="text" value={this.state.userName} placeholder="My Username" onChange={this.handleChange.bind(this)}/>
                    <button type="button" onClick={this.login.bind(this)}>Login</button>
                    <p><a href="/register">Register</a></p>
                    <p>{this.state.status}</p>
                </div>
            </div>
        )
    }

    handleChange(e) {
        this.setState({ userName: e.target.value });
    }

    login() {
        this.props.action.getUser(this.state.userName).then( res => {
            if (!res.user) this.setState({ status: 'User not found' });
            this.props.history.push('/dashboard?_id=' + res.user._id);
        } );
    }
};


const mapStateToProps = state => ({
    login: state.loginReducer.login
});

const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(loginAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);