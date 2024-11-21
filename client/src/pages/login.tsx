import Link from 'next/link';

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <button>Sign up</button>
      <button>Login with Google</button>
      <Link href="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default Login;
