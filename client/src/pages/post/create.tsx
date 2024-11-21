import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, content }); // 서버에 데이터 전송 로직 추가
    router.push('/post'); // 글 작성 후 게시판 메인으로 이동
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border rounded"
          rows={5}
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </main>
  );
};

export default CreatePost;
