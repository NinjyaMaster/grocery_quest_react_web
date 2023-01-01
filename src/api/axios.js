import axios from 'axios';
import { BASE_URL } from '../constants/network';

export default axios.create({
  baseURL: BASE_URL,
});
