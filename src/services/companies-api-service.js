import TokenService from './token-service';
import config from '../config';

const CompaniesApiService = {
  getCompany(company_id) {
    return fetch(`${config.API_ENDPOINT}/companies/${company_id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default CompaniesApiService;
