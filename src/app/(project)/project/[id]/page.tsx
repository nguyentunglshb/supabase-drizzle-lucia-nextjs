import Editor from '@/components/editor/editor';
import AddMembersForm from '@/components/project/addMembersForm';
import { db } from '@/lib/database';
import { notFound } from 'next/navigation';
// import { usersInProject } from '@/lib/database/schema';
// import { eq } from 'drizzle-orm';

// const getUsersInProject = async (id: string) => {
//   return await db.select().from(usersInProject).where(eq(usersInProject.projectId, id));
// };

const getProjectDetail = async (id: string) => {
  return await db.query.project.findFirst({
    where: (project, { eq }) => eq(project.id, id),
  });
};

export default async function Page({ params }: { params: { id: string } }) {
  const project = await getProjectDetail(params.id);
  console.log({ project });

  if (!project) return notFound();

  return (
    <div className="py-40">
      <Editor dataHTML={project?.data || ''} title={project?.name || ''} />
      <AddMembersForm />
    </div>
  );
}
