const loginReducer = (state = { user: ['user1', 'user2'] }, action) => {
    switch (action.type) {
        case 'GET_USER':
            return {...state, user: Object.assign([], action.user)};
        default:
            return state;
    }
};

export default loginReducer;