import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input, Textarea, Button, Spacer, Card } from "@nextui-org/react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, content }); // 서버에 데이터 전송 로직 추가
    router.push("/post"); // 글 작성 후 게시판 메인으로 이동
  };

  return (
    <Card style={{ maxWidth: "600px", margin: "auto", padding: "24px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>새로운 글쓰기</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <Input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="lg"
          required
        />
        <Spacer y={1} />
        <Textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          size="lg"
          rows={6}
          required
        />
        <Spacer y={1.5} />
        <Button type="submit" size="lg">
          글쓰기
        </Button>
      </form>
    </Card>
  );
};

export default CreatePost;
