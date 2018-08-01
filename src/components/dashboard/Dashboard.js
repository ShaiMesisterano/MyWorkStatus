import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dashboardAction from '../../action/DashboardAction';

let userId;
let usersPolling;

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: ' (Loading...) ',
            status: ' (Loading...) ',
            users: [],
            filterText: ''
        };
        this.handleNewStatus = this.handleNewStatus.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.createTable = this.createTable.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    componentDidMount() {
        userId = this.props.location.search.split('_id=')[1];
        this.getUsersPolling();
        this.getCurrentUser();
    }

    getUsersPolling() {
        usersPolling = setInterval(() => this.getUsers(), 2000);
    }

    getUsers() {
        return this.props.action.getUsers().then((res) => {
            this.setState({users: res.users});
        });
    }

    getCurrentUser() {
        this.getUsers().then(() => {
            let user = this.state.users.filter((user) => user._id === userId);
            if (user.length > 0) {
                this.setState({
                    userName: user[0].UserName,
                    status: user[0].CurrentStatus
                });
            }
        });
    }

    handleNewStatus(event) {
        const newStatus = event.target.value;
        this.props.action.updateStatus(userId, newStatus).then(() => {
            this.setState({status: newStatus});
        });
    }

    handleSearch(event) {
        const searchText = event.target.value;
        if (!searchText) {
            this.getUsersPolling();
        }
        else {
            clearInterval(usersPolling);
        }

        this.setState(
            {
                users: this.state.users.filter((user) => {
                        return user && typeof user.UserName === "string" && user.UserName.indexOf(searchText) > -1;
                    }
                )
            });
    }

    handleFilter(event) {
        const filterText = event.target.value;
        if (!filterText) {
            this.getUsersPolling();
            return;
        }
        else {
            clearInterval(usersPolling);
        }

        this.getUsers().then(() => {
            this.setState(
                {
                    filterText: filterText,
                    users: this.state.users.filter((user) => {
                            return user && typeof user.CurrentStatus === "string" && user.CurrentStatus === filterText;
                        }
                    )
                });
        });
    }

    createTable = () => {
        let users = this.state.users;
        if (users.length === 0) return;

        let children = [];
        let background;
        for (let user of users) {
            background = user.CurrentStatus === 'OnVacation' ? 'red' : 'white';
            children.push(<li class="list-group-item" style={{backgroundColor: background}}>{`${user.UserName} (${user.CurrentStatus})`}</li>)
        }
        return children;
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid bg-info text-white text-center">
                Hello {this.state.userName}, your status is: '{this.state.status}'
                </div>
                Update My Current Status:
                <select value={this.state.newStatus} onChange={this.handleNewStatus}>
                    <option value="Working">Working</option>
                    <option value="OnVacation">On Vacation</option>
                    <option selected value="LunchTime">Lunch Time</option>
                    <option value="BusinessTrip">Business Trip</option>
                </select>
                <h1 className="display-6">List of employees:</h1>
                <p>Search: <input type="text" placeholder="Search By Name..." onChange={this.handleSearch}/></p>
                <p>Filter: <select value={this.state.filterText} onChange={this.handleFilter}>
                    <option value="">Filter By Status...</option>
                    <option value="Working">Working</option>
                    <option value="OnVacation">On Vacation</option>
                    <option selected value="LunchTime">Lunch Time</option>
                    <option value="BusinessTrip">Business Trip</option>
                </select>
                </p>
                <p>
                    <ul className="list-group">
                        {this.createTable()}
                    </ul>
                </p>
            </div>
        )
    }
};

const mapStateToProps = state => ({
    dashboard: state.dashboardReducer.dashboard
});

const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(dashboardAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);