import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../config";

export const useFetchCurrentUser = (isLoggedIn) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${config.url}/api/users/current`);
      setUsername(response.data.body.username);
    }
    if (isLoggedIn) {
      fetchData();
    }
  }, [username, isLoggedIn]);

  return username;
};
