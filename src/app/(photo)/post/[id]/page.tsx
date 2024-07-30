import { Metadata } from 'next';

type PageProps = {
  params: {
    id: string;
  };
};

const getPost = async (id: string) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = params.id;

  const post = await getPost(id);

  return {
    title: post.title,
    description: post.body,
    openGraph: {
      title: post.title,
      description: post.body,
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <div className="py-20">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
