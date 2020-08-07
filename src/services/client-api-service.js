import TokenService from './token-service';
import config from '../config';

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
  addClient(
    name,
    location,
    day_of_week,
    hours_of_operation,
    currently_closed,
    notes,
    general_manager,
    company_id
  ) {
    // note: sales_rep_id and company_id are not set by the user
    const client = {
      name,
      location,
      day_of_week,
      hours_of_operation,
      currently_closed,
      notes,
      general_manager,
      company_id,
    };

    return fetch(`${config.API_ENDPOINT}/clients`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
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
  updateClient(
    client_id,
    name,
    location,
    day_of_week,
    hours_of_operation,
    currently_closed,
    notes,
    general_manager
  ) {
    // note: sales_rep_id and company_id will not be changed by the user
    const client = {
      name,
      location,
      day_of_week,
      hours_of_operation,
      currently_closed,
      notes,
      general_manager,
    };

    return fetch(`${config.API_ENDPOINT}/clients/${client_id}`, {
      method: 'PATCH',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(client),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteClient(client_id) {
    return fetch(`${config.API_ENDPOINT}/clients/${client_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default ClientApiService;
