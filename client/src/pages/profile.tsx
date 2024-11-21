import { useState } from 'react';

const Profile = () => {
  // Simulated user data
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });

  const [newName, setNewName] = useState(user.name);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (currentPassword === '') {
      setMessage('Please enter your current password.');
      return;
    }

    try {
      console.log({
        name: newName,
        newPassword,
        currentPassword,
      });
      setUser({ ...user, name: newName });
      setMessage('Profile updated successfully.');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl mb-4">Profile</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="p-2 border rounded w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
