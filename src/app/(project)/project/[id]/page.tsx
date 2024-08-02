import AddMembersForm from '@/components/project/addMembersForm';
import { db } from '@/lib/database';
import { usersInProject } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';

const getUsersInProject = async (id: string) => {
  return await db.select().from(usersInProject).where(eq(usersInProject.projectId, id));
};

export default async function Page({ params }: { params: { id: string } }) {
  const users = await getUsersInProject(params.id);

  console.log({ users });

  return (
    <div className="py-40">
      <AddMembersForm />
    </div>
  );
}
