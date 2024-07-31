import CreateProjectForm from "@/components/project/createProjectForm";
import { db } from "@/lib/database";
import { project } from "@/lib/database/schema";

export default async function Page() {
  const projects = await db.select().from(project)

  console.log({projects});
  

  return <div className="py-32">
    <CreateProjectForm />
  </div>;
}
