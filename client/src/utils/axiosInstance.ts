import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // 서버의 로컬 주소로 변경
  timeout: 1000,
  withCredentials: true, // 쿠키와 자격 증명을 포함하도록 설정
});

export default axiosInstance;
