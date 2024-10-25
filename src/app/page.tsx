import { Suspense } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Função de fetch diretamente no servidor
async function getPosts(): Promise<Post[]> {
  // adicione um sleep para testes
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}

// Componente para renderizar os posts com cada título ocupando a largura total disponível
function PostsList({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {posts.map((post: Post) => (
        <div
          key={post.id}
          className="flex flex-col p-6 bg-white border border-gray-200 hover:bg-gray-50 transition-all rounded-md shadow-sm hover:shadow-lg cursor-pointer w-full"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-wide transition-colors duration-300 hover:text-blue-600">
            {post.title}
          </h2>
        </div>
      ))}
    </div>
  );
}

// Componente assíncrono que busca os posts e renderiza o PostsList
async function PostsListWithData() {
  const posts = await getPosts();
  return <PostsList posts={posts} />;
}

// Função principal do componente
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100 w-full">
      <main className="flex flex-col gap-8 items-center sm:items-start w-full">
        {/* Título geral dos posts */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center sm:text-left w-full">
          Posts:
        </h1>
        <Suspense fallback={<div>Loading posts...</div>}>
          {/* Envolvemos o componente assíncrono com Suspense */}
          <PostsListWithData />
        </Suspense>
      </main>
    </div>
  );
}
