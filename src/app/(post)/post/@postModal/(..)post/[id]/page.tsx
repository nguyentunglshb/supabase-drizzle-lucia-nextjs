import CloseModal from '@/components/closeModal';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

const getPost = async (id: string) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogTitle>{post.title}</DialogTitle>
        <div className="py-20">
          <CloseModal />
          <h1>{params.id}</h1>
        </div>
        <DialogDescription>{post.body}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
