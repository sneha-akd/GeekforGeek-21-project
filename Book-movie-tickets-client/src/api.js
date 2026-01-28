import axios from "axios";

console.log("Checking API env ", import.meta.env.VITE_BASE_SERVER_URL);
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL ?? ""
});

api.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    if (error.response && error.response.status === 401) {
      // Handle the 401 error here, e.g., redirect to login, refresh token, or dispatch a logout action
      console.log('401 Unauthorized error caught by interceptor');

      // It is important to return a rejected promise to stop further code execution
      // in the original request's .catch() block, if necessary.
      return Promise.reject({ message: 'Unauthorized' });
    }

    // For all other errors, continue to reject the promise
    return Promise.reject(error);
  }
);


export const getShows = () => api.get("/shows");
export const getShowSeats = (id) => api.get(`/shows/${id}/seats`);
export const lockSeats = (payload) => api.post("/bookings/book-seats", payload);
export const checkout = (payload) => api.post("/bookings/checkout", payload);

export const login = (payload) => api.post("/user/login", payload);
export const signup = (payload) => api.post("/user/signup", payload);
export const reset = (payload) => api.patch("/user/reset-password", payload);
export const logout = () => api.get("/user/logout");

export default api;