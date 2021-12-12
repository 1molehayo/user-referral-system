import _axios from 'axios';

const axios = _axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 180000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default axios;
