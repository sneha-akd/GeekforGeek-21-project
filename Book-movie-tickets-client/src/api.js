import axios from "axios";

const api = axios.create({
  baseURL: ""
});

export const getShows = () => api.get("/shows");
export const getShowSeats = (id) => api.get(`/shows/${id}/seats`);
export const lockSeats = (payload) => api.post("/bookings/book-seats", payload);
export const checkout = (payload) => api.post("/bookings/checkout", payload);

export const login = (payload) => api.post("/user/login", payload);
export const logout = () => api.get("/user/logout");

export default api;