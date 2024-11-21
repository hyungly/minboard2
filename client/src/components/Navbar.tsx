import Link from 'next/link';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/profile">Profile</Link></li>
        <li><Link href="/board">Board</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
