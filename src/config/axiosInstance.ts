import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://magic-scroll-api-production.up.railway.app/api/",
  withCredentials: true,
});

// * Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // * Pakai getState untuk mencegah error hooks hanya boleh dipakai didalam component
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// * Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // * Cek kalo token expired
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Token expired"
    ) {
      try {
        // Try to refresh the token
        const response = (
          await axiosInstance.post<{ message: string; token: string }>(
            "/auth/refresh",
            null
          )
        ).data;

        localStorage.setItem("token", response.token);

        // Update the Authorization header with the new token
        originalRequest.headers.Authorization = `Bearer ${response.token}`;

        // Retry the original request
        return axios(originalRequest);
      } catch (error) {
        console.error("Error refreshing token:", error);
        // Optionally, you can logout the user or perform other actions
      }
    }

    // Return the error for other cases
    return Promise.reject(error);
  }
);

export default axiosInstance;
