// src/pages/post/index.tsx
import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  Input, 
  Button, 
  Avatar, 
  Pagination, 
  Chip 
} from "@nextui-org/react";
import Link from "next/link";
import { Search, PenLine, MessageCircle, MessagesSquare } from 'lucide-react';
interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  summary?: string;
  commentCount: number;
}

const PostList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const posts: Post[] = [
    { 
      id: 1, 
      title: "첫 게시글", 
      author: "minboard", 
      createdAt: "2024-02-15 14:30",
      summary: "이 게시판의 첫 게시글입니다. 앞으로 다양한 이야기들이 여기에 담길 예정입니다.",
      commentCount: 5,
    },
    { 
      id: 2, 
      title: "두번째 게시글", 
      author: "developer", 
      createdAt: "2024-02-16 10:45",
      summary: "기술과 창의성이 만나는 공간, Minboard에 오신 것을 환영합니다.",
      commentCount: 2,
    },
    { 
      id: 3, 
      title: "글의 길이", 
      author: "jamitda", 
      createdAt: "2024-02-16 10:48",
      summary: "",
      commentCount: 0,
    },
    { 
      id: 4, 
      title: "글의 길이", 
      author: "jamitda", 
      createdAt: "2024-02-16 10:49",
      summary: "",
      commentCount: 0,
    },
    { 
      id: 5, 
      title: "글의 길이", 
      author: "jamitda", 
      createdAt: "2024-02-16 10:58",
      summary: "",
      commentCount: 0,
    },
    { 
      id: 6, 
      title: "글의 길이", 
      author: "jamitda", 
      createdAt: "2024-02-16 11:48",
      summary: "",
      commentCount: 0,
    },
  ];

  const sortedPosts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const filteredPosts = sortedPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-default-800"><MessagesSquare className="mb-2" />게시판</h1>
        <Link href="/post/create">
          <Button 
            color="primary" 
            variant="solid" 
            startContent={<PenLine size={18} />}
          >
            글쓰기
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <Input
          isClearable
          radius="lg"
          placeholder="제목 또는 작성자로 검색..."
          startContent={<Search size={18} />}
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
      </div>

      <div className="space-y-4">
        {currentPosts.map((post) => (
          <Card 
          key={post.id} 
          isPressable 
          onPress={() => window.location.href = `/post/${post.id}`}
          className="hover:shadow-lg transition-all duration-300 relative
                     dark-shadow-lg
                     dark:bg-default-50/50 
                     dark-pressable-card 
                     dark:hover:bg-default-100/60"
        >
            <CardBody>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3 mr-8">
                  <Avatar 
                    name={post.author.charAt(0).toUpperCase()} 
                    size="sm" 
                    className="bg-primary text-white" 
                  />
                  <div>
                    <p className="text-sm font-semibold">{post.author}</p>
                    <p className="text-xs text-default-500">{post.createdAt}</p>
                  </div>
                </div>
                <Chip size="sm" variant="flat" color="primary">
                  #{post.id}
                </Chip>
              </div>
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              {post.summary && (
                <p className="text-default-600 text-sm line-clamp-2">
                  {post.summary}
                </p>
              )}
              <div className="mt-2 flex items-center text-default-500">
                <MessageCircle size={18} className="mr-2" />
                <span className="text-sm">{post.commentCount}개의 댓글</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Pagination
          total={Math.ceil(filteredPosts.length / postsPerPage)}
          initialPage={1}
          page={currentPage}
          onChange={setCurrentPage}
          color="primary"
        />
      </div>
    </div>
  );
};

export default PostList;
