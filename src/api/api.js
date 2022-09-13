import axios from 'axios';

// Axios instance with default config
export const myApi = axios.create({
  baseURL: 'https://bootcamp-rent-car.herokuapp.com',
  headers: {
    access_token: JSON.parse(localStorage.getItem('auth')).access_token,
  },
});

myApi.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err?.response?.data?.name === 'JsonWebTokenError') {
      localStorage.removeItem('auth');
      window.location.href = '/login';
    }
  }
);
