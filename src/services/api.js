import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const UserSignIn = (email, password) =>
  api.post("/user/signin", { email, password });

export const AccessCourses = (id) => 
  api.get(`/course/courses/${id}`);

export default api;
