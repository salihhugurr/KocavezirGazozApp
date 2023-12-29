import AxiosInstance from "./service.common";

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
