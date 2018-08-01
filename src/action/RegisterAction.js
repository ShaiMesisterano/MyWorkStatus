import * as ActionType from './ActionType';

export function addUser(userName) {
    return (dispatch) => {
        const apiLocation = 'http://localhost:8000/addUser?UserName='  + userName;

        return fetch(apiLocation, err => {
            console.log('Error: ', err);
        })
            .then(response => {
            return response.json();
        })
            .then(data => {
                return dispatch({
                    type: ActionType.ADD_USER,
                    user: data
                });
            });

    }
}