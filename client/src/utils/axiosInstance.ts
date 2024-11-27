import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // 서버의 로컬 주소로 변경
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
