import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Sample Title");
  const [content, setContent] = useState("This is a sample post content.");

  // Simulated delete function
  const handleDelete = () => {
    console.log(`Post ${id} deleted!`);
    // Simulate navigation after deletion
    router.push("/post");
  };

  // Simulated save function
  const handleSave = () => {
    console.log(`Post ${id} updated with title: ${title}, content: ${content}`);
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Post {id}</h1>
      
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded w-full mb-4"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-2 border rounded w-full mb-4"
            rows={5}
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="mb-4">{content}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
