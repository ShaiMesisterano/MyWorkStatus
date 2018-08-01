const dashboardReducer = (state = { users: ['user1', 'user2'] }, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {...state, user: Object.assign([], action.users)};
        default:
            return state;
    }
};

export default dashboardReducer;