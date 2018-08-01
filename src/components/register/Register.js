import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as registerAction from "../../action/RegisterAction";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        };
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid bg-info text-white text-center">Please fill details</div>
                <div>
                    <input type="text" value={this.state.userName} placeholder="My Username" onChange={this.handleChange.bind(this)}/>
                    <button type="button" onClick={this.register.bind(this)}>Register</button>
                </div>
            </div>
        )
    }

    handleChange(e) {
        this.setState({ userName: e.target.value });
    }

    register() {
        this.props.action.addUser(this.state.userName).then( res => {
            this.props.history.push('/');
        } );
    }
};

const mapStateToProps = state => ({
    register: state.registerReducer.register
});

const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(registerAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);