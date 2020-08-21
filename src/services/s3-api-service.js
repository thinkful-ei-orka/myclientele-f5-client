import config from '../config';

const S3ApiService = {
  getUploadUrl(name, type) {
    return fetch(`${config.API_ENDPOINT}/presignedurl?name=${name}&type=${type}`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  }
};

export default S3ApiService;
