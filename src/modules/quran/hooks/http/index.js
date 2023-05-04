import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.alquran.cloud',
  headers: { Accept: 'application/json' },
});
const axiosInstanceForTafsir = axios.create({
  baseURL: 'https://quran.api-docs.io/v4/',
  headers: { Accept: 'application/json' },
});

export default {axiosInstance, axiosInstanceForTafsir};