import AxiosInstance from './service.common';

AxiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Axios request error:', error.response.data);
      console.error('Status code:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      console.error('Axios request error: No response received');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Axios request error:', error.message);
    }
    console.error('Axios request config:', error.config);
    return Promise.reject(error);
  },
);

export default AxiosInstance;
