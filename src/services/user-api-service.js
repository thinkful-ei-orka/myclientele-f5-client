import TokenService from "./token-service";
import config from "../config";

const UserApiService = {
  getUser(user_id) {
    return fetch(`/${config.API_ENDPOINT}/users/${user_id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getUserContactInfo() {
    return fetch(`${config.API_ENDPOINT}/users/contact`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  updateUserContactInfo(updatedUserFields) {
    console.log(updatedUserFields);
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUserFields),
    }).then((res) => {
      console.log(res);
      // !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    }
    );
  },

  getUsersByCompanyId() {
    return fetch(`${config.API_ENDPOINT}/users/employees`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }).then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      );
  },
  confirmPassword(password) {
    return fetch(`${config.API_ENDPOINT}/auth/confirmpassword`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(password),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
};

export default UserApiService;
