import Image from "next/image";
import { Suspense } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Função de fetch diretamente no servidor
async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}

// Componente para renderizar os posts
function PostsList({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map((post: Post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </>
  );
}

// Função principal do componente
export default async function Home() {
  // Chamamos a função getPosts diretamente aqui
  const posts = await getPosts();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        {/* Suspense vai renderizar o fallback até que o conteúdo esteja pronto */}
        <Suspense fallback={<div>Loading posts...</div>}>
          <PostsList posts={posts} />
        </Suspense>
      </main>
    </div>
  );
}
