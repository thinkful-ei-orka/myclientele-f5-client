import TokenService from "./token-service";
import config from "../config";

const PhotoApiService = {
  getPhotosByReportId(report_id) {
    return fetch(`${config.API_ENDPOINT}/photos`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  addPhoto(client_id, notes, photo_url) {
    // note: sales_rep_id is self and date is now (handled by the back end)
    const report = { client_id, notes, photo_url };

    return fetch(`${config.API_ENDPOINT}/reports`, {
      method: "POST",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(report),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deletePhotoByUrl(photo_url) {
    return fetch(`${config.API_ENDPOINT}/photos`, {
      method: 'POST',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({photo: photo_url})
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : 0
    );
  },
};


export default PhotoApiService;
