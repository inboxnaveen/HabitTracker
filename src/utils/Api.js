import axios, {AxiosPromise} from 'axios';

import APIURL from './urlConfig';

const callApi = (formData, url, Method, token) => {
  const response = axios({
    url: APIURL + url,
    method: Method,
    data: formData,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-API-KEY': 'AIzaSyCOFnSXd8doquqhf4VBdeKM2fTRTemCv4',
      'X-AUTH-TOKEN': token,
    },
  });
  return response;
};
const callApiWithContextType = (formData, url, Method, token) => {
  const response = axios({
    url: APIURL + url,
    method: Method,
    data: formData,
    headers: {
      'content-type': 'multipart/form-data',
      'X-API-KEY': 'AIzaSyCOFnSXd8doquqhf4VBdeKM2fTRTemCv4',
      'X-AUTH-TOKEN': token,
    },
  });
  return response;
};

const postApi = (body, url) => {
  return new Promise((resolve, reject) => {
    callApi(body, url, 'POST')
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
const postApiAuthUser = (body, url, token) => {
  return new Promise((resolve, reject) => {
    callApi(body, url, 'POST', token)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getApi = (url, token) => {
  return new Promise((resolve, reject) => {
    callApi('', url, 'GET', token)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const postApiMultipart = (body, url, token) => {
  return new Promise((resolve, reject) => {
    callApiWithContextType(body, url, 'POST', token)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  postApi,
  getApi,
  postApiAuthUser,
  postApiMultipart,
};
