import { formatDate } from '@/lib/dayjs';

type MessageProps = {
  id: string;
  text: string | null;
  created_at?: Date;
  x: number;
  y: number;
  author: string;
};

const SingleMessage = ({ text, created_at, x, y, author }: MessageProps) => {
  return (
    <div
      className="absolute"
      style={{
        top: y + 'px',
        left: x + 'px',
      }}
    >
      <p>{text}</p>
      <p>{formatDate(created_at)}</p>
      <p>{author}</p>
    </div>
  );
};

export default SingleMessage;
