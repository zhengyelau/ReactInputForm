import axios from "axios";

function createAxiosClient() {
  return axios.create({
    timeout: 10000,
  });
}

export function postRequest(URL, payload) {
  return createAxiosClient()
    .post(`${URL}`, payload)
    .then((response) => response);
}