import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Avatar, 
  Textarea, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Chip,
  Divider
} from "@nextui-org/react";
import Link from "next/link";
import { 
  Edit2, 
  Trash2, 
  MessageCircle, 
  SendHorizontal, 
  MoreVertical 
} from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  commentCount: number;
  comments: Comment[];
}

const PostDetail: React.FC = () => {
  // Mock post data (in a real app, this would come from an API or database)
  const [post, setPost] = useState<Post>({
    id: 1,
    title: "첫 게시글",
    content: `이 게시판의 첫 게시글입니다. 
    앞으로 다양한 이야기들이 여기에 담길 예정입니다. 
    기술, 창의성, 그리고 커뮤니티의 힘을 보여드리겠습니다.`,
    author: "minboard",
    createdAt: "2024-02-15 14:30",
    commentCount: 5,
    comments: [
      {
        id: 1,
        author: "developer",
        content: "첫 댓글을 남깁니다! 기대되는 게시판입니다.",
        createdAt: "2024-02-15 15:00"
      },
      {
        id: 2,
        author: "jamitda",
        content: "환영합니다! 좋은 글 기대할게요.",
        createdAt: "2024-02-15 16:20"
      }
    ]
  });

  const [newComment, setNewComment] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleDeletePost = () => {
    // Implement post deletion logic
    console.log('Delete post');
    onOpenChange();
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: post.comments.length + 1,
        author: 'Current User', // Replace with actual logged-in user
        content: newComment,
        createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
      };

      setPost(prev => ({
        ...prev,
        comments: [...prev.comments, comment],
        commentCount: prev.commentCount + 1
      }));

      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setPost(prev => ({
      ...prev,
      comments: prev.comments.filter(comment => comment.id !== commentId),
      commentCount: prev.commentCount - 1
    }));
  };

  const handleSaveEdit = () => {
    setPost(prev => ({
      ...prev,
      content: editedContent
    }));
    setEditMode(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <Card 
        className="mb-6 dark:bg-default-50/50 dark-shadow-lg" 
      >
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Avatar 
              name={post.author.charAt(0).toUpperCase()} 
              size="md" 
              className="bg-primary text-white" 
            />
            <div>
              <p className="text-sm font-semibold">{post.author}</p>
              <p className="text-xs text-default-500">{post.createdAt}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              isIconOnly 
              variant="light" 
              onClick={() => setEditMode(!editMode)}
            >
              <Edit2 size={18} />
            </Button>
            <Button 
              isIconOnly 
              variant="light" 
              color="danger" 
              onPress={onOpen}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          
          {editMode ? (
            <div>
              <Textarea
                value={editedContent}
                onValueChange={setEditedContent}
                minRows={6}
                className="mb-4"
              />
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="light" 
                  onClick={() => setEditMode(false)}
                >
                  취소
                </Button>
                <Button 
                  color="primary" 
                  onClick={handleSaveEdit}
                >
                  저장
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-default-600 whitespace-pre-line">
              {post.content}
            </p>
          )}
        </CardBody>
      </Card>

      {/* Comments Section */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <MessageCircle size={22} className="mr-2" />
          <h2 className="text-xl font-semibold">
            댓글 {post.commentCount}개
          </h2>
        </div>

        {/* New Comment Input */}
        <div className="mb-4 flex items-center space-x-2">
          <Textarea
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onValueChange={setNewComment}
            minRows={2}
            className="flex-grow"
          />
          <Button 
            isIconOnly 
            color="primary" 
            variant="solid"
            onClick={handleAddComment}
            isDisabled={!newComment.trim()}
          >
            <SendHorizontal size={20} />
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {post.comments.map((comment) => (
            <Card 
              key={comment.id} 
              shadow="none" 
              className="dark:bg-default-50/50 border border-default-200 dark:border-default-100" 
            >
              <CardHeader className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Avatar 
                    name={comment.author.charAt(0).toUpperCase()} 
                    size="sm" 
                    className="bg-secondary text-white" 
                  />
                  <div>
                    <p className="text-sm font-semibold">{comment.author}</p>
                    <p className="text-xs text-default-500">{comment.createdAt}</p>
                  </div>
                </div>
                <Button 
                  isIconOnly 
                  variant="light" 
                  size="sm"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </CardHeader>
              <CardBody>
                <p className="text-default-600">{comment.content}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Delete Post Confirmation Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                게시글 삭제
              </ModalHeader>
              <ModalBody>
                <p>
                  정말로 이 게시글을 삭제하시겠습니까? 
                  삭제된 게시글은 복구할 수 없습니다.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  취소
                </Button>
                <Button color="danger" onPress={handleDeletePost}>
                  삭제
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PostDetail;