import { formatDate } from '@/lib/dayjs';
import { AnimationProps, motion } from 'framer-motion';

type MessageProps = {
  id: string;
  text: string | null;
  created_at?: Date;
  x: number;
  y: number;
  author: string;
  color: string;
};

const SingleMessage = ({ text, created_at, x, y, author, color }: MessageProps) => {
  const animate: AnimationProps['animate'] = {
    opacity: 1,
    width: 'auto',
  };

  return (
    <motion.div
      className="absolute rounded-md border p-3"
      style={{
        top: y + 'px',
        left: x + 'px',
        background: color,
      }}
      animate={animate}
    >
      <p>
        {text} - <span className="font-medium">{author}</span>
      </p>
      <p>{formatDate(created_at)}</p>
    </motion.div>
  );
};

export default SingleMessage;
