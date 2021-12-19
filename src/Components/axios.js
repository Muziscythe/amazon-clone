import axios from "axios";

const instance = axios.create({
  baseURL: ""
  // app delpoyed in heroku
});

export default instance;
