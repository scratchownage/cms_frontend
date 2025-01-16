
export const getAuthToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  export const setAuthToken = (token: string) => {
    localStorage.setItem('accessToken', token);
  };
  
  export const clearAuthToken = () => {
    localStorage.removeItem('accessToken');
  };
  