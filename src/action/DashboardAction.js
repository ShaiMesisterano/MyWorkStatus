import * as ActionType from './ActionType';

const apiRoot = 'http://localhost:8000';

export function getUsers(){
    return (dispatch) => {
        const apiLocation = apiRoot + '/users';
        return fetch(apiLocation, err => {
            console.log('Error: ', err);
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return dispatch({
                    type: ActionType.GET_USERS,
                    users: data
                });
            });
    }
}

export function updateStatus(_id, currentStatus){
    return (dispatch) => {
        const apiLocation = apiRoot + '/updateStatus?_id=' + _id + '&CurrentStatus=' + currentStatus;
        return fetch(apiLocation, err => {
            console.log('Error: ', err);
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return dispatch({
                    type: ActionType.UPDATE_STATUS,
                    users: data
                });
            });
    }
}