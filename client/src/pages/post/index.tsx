import Link from "next/link";
import { Card, Button } from "@nextui-org/react";

const PostList = () => {
  const posts = [
    { id: 1, title: "첫 게시글" },
    { id: 2, title: "두번째도 혹시?" },
  ];

  return (
    <main style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>게시판</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {posts.map((post) => (
          <Card
            key={post.id}
            className="hover:shadow-lg transition-shadow"
            style={{
              padding: "16px",
              cursor: "pointer",
              // border: "1px solid #eaeaea", //조잡해보임
              borderRadius: "8px",
            }}
          >
            <Link href={`/post/${post.id}`} style={{ textDecoration: "none" }}>
              <span
                style={{
                  color: "inherit",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {post.title}
              </span>
            </Link>
          </Card>
        ))}
      </div>
      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <Link href="/post/create">
          <Button> 글쓰기 </Button>
        </Link>
      </div>
    </main>
  );
};

export default PostList;
