import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Post {id}</h1>
      {/* Fetch and display the post and its comments */}
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default Post;
