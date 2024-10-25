// app/[id]/page.tsx

import { notFound } from 'next/navigation';
import type { Post } from '../types';

// Função para buscar o post individual
async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok) {
    return null;
  }

  return res.json();
}

// Componente da página
export default async function PostPage(props: any) {
  const params = await props.params;

  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-wide transition-colors duration-300">
            {post.title}
        </h1>
        <p className="text-gray-700">{post.body}</p>
      </div>
    </div>
  );
}
