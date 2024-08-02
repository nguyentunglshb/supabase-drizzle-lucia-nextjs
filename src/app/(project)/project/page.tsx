import CreateProjectForm from '@/components/project/createProjectForm';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { db } from '@/lib/database';
import { project, user } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';

export default async function Page() {
  const projects = await db
    .select()
    .from(project)
    .leftJoin(user, eq(project.ownerId, user.id))
    .where(eq(project.ownerId, user.id));

  return (
    <div className="py-32">
      <div className="grid grid-cols-4 gap-10">
        {projects.map((p) => (
          <Link
            href={`/project/${p?.project?.id}`}
            className="rounded-xl border bg-card text-card-foreground shadow transition hover:shadow-lg"
            key={p?.project?.id}
          >
            <CardHeader>
              <CardTitle>{p?.project?.name}</CardTitle>
              <CardDescription>{p?.project?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{dayjs(p?.project?.createdAt).format('DD/MM/YYYY')}</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Link>
        ))}
        <Link
          className="rounded-xl border bg-card text-card-foreground shadow transition hover:shadow-lg"
          href={'/project/create'}
        >
          <CardHeader>
            <CardTitle>Create new project</CardTitle>
            <CardDescription>Click here to create new project</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create now!</p>
          </CardContent>
          <CardFooter>
            <Button>Create new project</Button>
          </CardFooter>
        </Link>
      </div>
      <CreateProjectForm />
    </div>
  );
}
