import TokenService from "./token-service";
import config from "../config";

const ClientApiService = {
    getClients() {
        return fetch(`${config.API_ENDPOINT}/clients`, {
            headers: {
                Authorization: `bearer ${TokenService.getAuthToken()}`,
                
            },
        }).then((res) => 
            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
        );
    },
    getClient(clientId) {
        return fetch(`${config.API_ENDPOINT}/clients/${clientId}`, {
            headers: {
                Authorization: `bearer ${TokenService.getAuthToken()}`,
            },
        }).then((res) => 
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
        );
    },
    postClient(name, location, hours_of_operation, currently_closed, day_of_week, notes, general_manager) {
        return fetch(`${config.API_ENDPOINT}/games`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                name: name,
                location: location,
                hours_of_operation: hours_of_operation,
                currently_closed: currently_closed,
                day_of_week: Number(day_of_week),
                notes: notes,
                general_manager: general_manager
            }),
        }).then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
        );
    },
    updateClient(clientId, name, location, hours_of_operation, currently_closed, day_of_week, notes, general_manager) {
        return fetch(`${config.API_ENDPOINT}/clients/${clientId}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                Authorization: `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                name: name,
                location: location,
                hours_of_operation: hours_of_operation,
                currently_closed: currently_closed,
                day_of_week: Number(day_of_week),
                notes: notes,
                general_manager: general_manager
            }),
        }).then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : 0));
    },
    deleteClient(clientId) {
        return fetch(`${config.API_ENDPOINT}/clients/${clientId}`, {
            method: "DELETE",
            headers: {
              Authorization: `bearer ${TokenService.getAuthToken()}`,
            },
          }).then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : 0));
    },
};


export default ClientApiService;