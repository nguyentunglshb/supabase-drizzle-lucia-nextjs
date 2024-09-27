import dynamic from 'next/dynamic';
import { FC } from 'react';
import Image from 'next/image';

const Output = dynamic(async () => (await import('editorjs-react-renderer')).default, {
  ssr: false,
});

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
};

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

interface EditorOutputProps {
  data: any;
}

const EditorOutput: FC<EditorOutputProps> = ({ data }) => {
  return <Output data={data} style={style} className="text-sm" renders={renderers} />;
};

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className="rounded-md bg-gray-800 p-4">
      <code className="text-sm text-gray-100">{data.code}</code>
    </pre>
  );
}

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative min-h-60 w-full">
      <Image alt="image" className="object-contain" fill src={src} />
    </div>
  );
}

export default EditorOutput;
