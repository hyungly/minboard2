import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Our Service</h1>
      <p>This is a simple bulletin board service.</p>
      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;
