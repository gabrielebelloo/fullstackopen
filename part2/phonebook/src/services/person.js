import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (body) => {
  const request = axios.post(baseUrl, body);
  return request.then((res) => res.data);
};

const update = (id, body) => {
  const request = axios.post(baseUrl + `/${id}`, body);
  return request.then((res) => res.data);
};

export default { getAll, create, update };
