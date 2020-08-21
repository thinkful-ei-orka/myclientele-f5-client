import TokenService from "./token-service";
import config from "../config";

const ClientApiService = {
  getAllClients() {
    return fetch(`${config.API_ENDPOINT}/clients`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  addClient(client) {
    return fetch(`${config.API_ENDPOINT}/clients`, {
      method: "POST",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(client),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getClient(client_id) {
    return fetch(`${config.API_ENDPOINT}/clients/${client_id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getClientsByCompanyId(company_id) {
    return fetch(`${config.API_ENDPOINT}/clients/company/${company_id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getClientsBySalesRepId(sales_rep_id) {
    return fetch(`${config.API_ENDPOINT}/clients/sales_rep_id/${sales_rep_id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  
  updateClient(client_id, client) {
    return fetch(`${config.API_ENDPOINT}/clients/${client_id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(client),
    }).then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : 0));
  },

  deleteClient(client_id) {
    return fetch(`${config.API_ENDPOINT}/clients/${client_id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : 0));
  }
};

export default ClientApiService;
