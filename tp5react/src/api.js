import axios from 'axios';

const API_KEY = 'b4af5452';

const api = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  params: {
    apikey: API_KEY
  }
});

export default api;