import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export default api;

export const UserSignIn = (email, password) =>
  api.post("/user/signin", { email, password });
