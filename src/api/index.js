import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.VITE_URL : 'http://localhost:8080';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers) => {
      const accessToken = JSON.parse(localStorage.getItem('token'));
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    },
  }),
  tagTypes: [
    'LOGIN',
    'UPLOADFILE',
    'UPLOADFILE',
    'SIGNUP',
    'EDITUSER',
    'EDITCARD',
    'ADDCARD',
    'DELETEFILE',
    'DELETEFILES',
  ],
  endpoints: () => ({}),
});

export default api;
