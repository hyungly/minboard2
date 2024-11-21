import Link from 'next/link';

const PostList = () => {
  const posts = [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" },
  ];

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Bulletin Board</h1>
      <ul className="mb-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/post/create">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Create New Post
        </button>
      </Link>
    </main>
  );
};

export default PostList;
