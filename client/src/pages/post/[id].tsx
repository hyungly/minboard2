import { useRouter } from "next/router";
import React, { useState } from "react";
import { Card, Input, Textarea, Button, Spacer } from "@nextui-org/react";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Sample Title");
  const [content, setContent] = useState("This is a sample post content.");

  const handleDelete = () => {
    console.log(`Post ${id} deleted!`);
    router.push("/post");
  };

  const handleSave = () => {
    console.log(`Post ${id} updated with title: ${title}, content: ${content}`);
    setIsEditing(false);
  };

  return (
    <Card style={{ maxWidth: "800px", margin: "auto", padding: "24px", minHeight: "40vh" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>Post {id}</h1>
      {isEditing ? (
        <div>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            size="lg"
          />
          <Spacer y={1} />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용"
            size="lg"
            rows={12} // 줄 수를 늘려서 입력 창의 길이를 조정
          />
          <Spacer y={1.5} />
          <div style={{ display: "flex", gap: "8px" }}>
            <Button onClick={handleSave} color="success" size="lg">
              저장
            </Button>
            <Button onClick={() => setIsEditing(false)} color="default" size="lg">
              취소
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>{title}</h2>
          <p style={{ marginBottom: "16px" }}>{content}</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button onClick={() => setIsEditing(true)} size="lg">
              수정
            </Button>
            <Button onClick={handleDelete} color="danger" size="lg">
              삭제
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Post;
