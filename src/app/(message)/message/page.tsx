import RealTimeMessages from '@/components/realtime-messages';
import { db } from '@/lib/database';
import { message } from '@/lib/database/schema';

export default async function Page() {
  const data = await db.select().from(message);
  console.log({ data });

  return <RealTimeMessages serverMessages={data ?? []} />;
}
