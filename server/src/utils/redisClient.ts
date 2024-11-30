import Redis from 'ioredis';

// Redis 클라이언트 생성
const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1', // Redis 서버 호스트
  port: parseInt(process.env.REDIS_PORT || '6379'), // Redis 포트
  password: process.env.REDIS_PASSWORD || '', // 비밀번호 (있는 경우)
});

// 연결 이벤트 로그
redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

//redis 클러스터 사용
// const cluster = new Redis.Cluster([
//   { host: '127.0.0.1', port: 6379 },
//   { host: '127.0.0.1', port: 6380 },
//   { host: '127.0.0.1', port: 6381 },
// ]);

// cluster.on('connect', () => {
//   console.log('Connected to Redis cluster');
// });

export default redis;
