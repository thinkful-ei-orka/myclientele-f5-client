import TokenService from "./token-service";
import config from "../config";

const UserApiService = {

    getUser(user_id) {
        return fetch(`/${config.API_ENDPOINT}/users/${user_id}`, {
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`,
            },
        }).then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json())
    },

    getUserContactInfo() {
        return fetch(`${config.API_ENDPOINT}/users/contact`, {
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then((res) =>
            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json())
        },

        updateUserContactInfo(updatedUserFields) {
            console.log(updatedUserFields)
            return fetch(`${config.API_ENDPOINT}/users/contact`, {
                method: 'PATCH',
                headers: {
                    authorization: `bearer ${TokenService.getAuthToken()}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify(updatedUserFields)
            })
            .then((res) =>
                !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json())
            },



}

export default UserApiService
