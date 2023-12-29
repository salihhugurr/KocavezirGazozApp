import axios from "axios";

const instance = axios.create({
  baseURL: `http://139.162.189.231:8000/`,
});

export default instance;
