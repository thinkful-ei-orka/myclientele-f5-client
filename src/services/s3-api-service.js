import config from '../config';

const S3ApiService = {
  getUploadUrl() {
    return fetch(`${config.API_ENDPOINT}/presignedurl`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default S3ApiService;
