import axios from 'axios';
import cookie from 'js-cookie';
require('dotenv').config();
const url = process.env.REACT_APP_API_URL;

axios.defaults.headers['Authorization'] = `Bearer ${cookie.get('token')}`;

export default axios.create({
  baseURL: url,
  responseType: 'json',
});