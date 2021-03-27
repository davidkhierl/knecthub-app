import axios from 'axios';

const pexels = axios.create({
  baseURL: 'https://api.pexels.com/v1',
  headers: { Authorization: '563492ad6f917000010000010db536c36683436aa3d2299d98e40a3a' }
});

export default pexels;
