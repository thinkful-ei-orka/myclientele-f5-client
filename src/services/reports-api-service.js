import TokenService from './token-service';
import config from '../config';

const ReportsApiService = {
  getAllReports() {
    console.log('getAllReports')
    return fetch(`${config.API_ENDPOINT}/reports`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  addReport(client_id, notes, photo_url) {
    // note: sales_rep_id is self and date is now (handled by the back end)
    const report = { client_id, notes, photo_url };

    return fetch(`${config.API_ENDPOINT}/reports`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(report),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getReport(report_id) {
    return fetch(`${config.API_ENDPOINT}/reports/${report_id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updateReport(report_id, client_id, notes, photo_url) {
    // break this down into variables later
    // note: sales_rep_id is self and date is now (handled by the back end)
    const report = { client_id, notes, photo_url };

    return fetch(`${config.API_ENDPOINT}/reports/${report_id}`, {
      method: 'PATCH',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(report),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteReport(report_id) {
    return fetch(`${config.API_ENDPOINT}/reports/${report_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default ReportsApiService;
