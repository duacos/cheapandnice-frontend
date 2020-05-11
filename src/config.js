import axios from "axios";

axios.defaults.withCredentials = true;

// api
export const config = {
  url: process.env.REACT_APP_API,
  docTitle: "cheapandnice",
};
