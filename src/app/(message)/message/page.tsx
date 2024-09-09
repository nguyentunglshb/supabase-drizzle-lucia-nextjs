import RealTimeMessages from '@/components/realtime-messages';
import { db } from '@/lib/database';
import { message } from '@/lib/database/schema';

export default async function Page() {
  const data = await db.select().from(message);

  return <RealTimeMessages serverMessages={data ?? []} />;
}
