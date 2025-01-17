// src/api/apiClient.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useAuth } from './useAuth';
interface AuthResponse {
  accessToken: string;
}

// Extend the JWT payload with the expected structure (e.g., username, role)
interface DecodedToken extends JwtPayload {
  username: string;
  role: string;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Include cookies in requests
});

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  let accessToken = localStorage.getItem('accessToken');
  const { logout } = useAuth();
  if (accessToken) {
    const { exp } = jwtDecode<DecodedToken>(accessToken); // Decode and type the token
    const isExpired = exp! * 1000 < Date.now();

    if (isExpired) {
      try {
        const response: AxiosResponse<AuthResponse> = await axios.post('api/auth/refresh-token', {}, { withCredentials: true });
        accessToken = response.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
      } catch (error) {
        console.error('Failed to refresh token:', error);
        logout()
        window.location.href = '/login'; // Redirect to login on failure
        throw error; // Ensure the request fails
      }
    }
  }

  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default apiClient;
