import * as ActionType from './ActionType';

export function getUser(userName){
    return (dispatch) => {
        const apiLocation = 'http://localhost:8000/user?UserName=' + userName;

        return fetch(apiLocation, err => {
            console.log('Error: ', err);
        })
            .then(response => {
                if (response.status === 500) {
                    console.log('Error: User not found');
                    return;
                }
                return response.json();
            })
            .then(data => {
                return dispatch({
                    type: ActionType.GET_USER,
                    user: data
                });
            });
    }
}