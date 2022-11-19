import axios from 'axios';

export const instance = axios.create({
  baseURL: '/api',
});

export const getUserList = async () => {
  const response = await instance.get('/users');
  return response.data;
};
