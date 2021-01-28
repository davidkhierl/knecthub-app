import axios from 'axios';
import config from 'config';

export interface ResponseError {
  location?: 'body' | 'cookies' | 'headers' | 'params' | 'query';
  message: any;
  param?: string;
  value?: string;
  nestedErrors?: any;
}

const api = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

export default api;
