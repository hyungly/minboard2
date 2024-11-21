import NavBar from '../components/Navbar';
import { useState } from 'react';

const Board = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <NavBar />
      <h1>Board</h1>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <button>Write a Post</button>
      {/* Add post list component here */}
    </div>
  );
};

export default Board;
