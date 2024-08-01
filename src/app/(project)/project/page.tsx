import CreateProjectForm from '@/components/project/createProjectForm';
import { db } from '@/lib/database';
import { project } from '@/lib/database/schema';

export default async function Page() {
  const projects = await db.select().from(project);

  return (
    <div className="py-32">
      {projects.map((project) => (
        <div key={project.id}>
          <p>{project.name}</p>
          <p>{project.data}</p>
          <p>{project.description}</p>
        </div>
      ))}
      <CreateProjectForm />
    </div>
  );
}
