'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import type EditorJS from '@editorjs/editorjs';
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';
import { AnimatedButton } from '../ui/button';

interface EditorProps {
  projectId?: string;
  dataHTML?: string;
  title?: string;
}

const Editor: FC<EditorProps> = ({ dataHTML, title }) => {
  const { register, handleSubmit } = useForm();

  const editorRef = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const ImageTool = (await import('@editorjs/image')).default;

    if (!editorRef?.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady: async () => {
          editorRef.current = editor;
          if (dataHTML) {
            await editor.blocks.renderFromHTML(dataHTML);
          }
        },
        placeholder: 'Write something here',
        inlineToolbar: true,
        data: {
          blocks: [],
        },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link',
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const toBase64Promise = new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                  });

                  return await toBase64Promise.then((base64) => ({
                    success: 1,
                    file: {
                      url: base64,
                    },
                  }));
                },
              },
            },
          },
          list: List,
          code: Code,
          table: Table,
          embed: Embed,
          inlineCode: InlineCode,
        },
      });
    }
  }, []);

  async function onSubmit(data: any) {
    const blocks = await editorRef.current?.save();

    const _payload: any = {
      title: data.title,
      content: blocks,
      //   subredditId,
    };

    console.log({ _payload });
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    setTimeout(() => {
      // focus to the title
      _titleRef.current?.focus();
    }, 0);

    if (isMounted) {
      init();

      return () => {
        editorRef.current?.destroy();
        editorRef.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  if (!isMounted) return null;

  const { ref: titleRef, ...rest } = register('title');

  return (
    <div className="w-full rounded-lg bg-zinc-50 p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextareaAutosize
          ref={(e) => {
            titleRef(e);
            // @ts-ignore
            _titleRef.current = e;
          }}
          {...rest}
          placeholder="Title"
          defaultValue={title}
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
        />
        <div id="editor" className="min-h-[500px]"></div>

        <AnimatedButton type="submit" variant="default">
          Submit
        </AnimatedButton>
      </form>
    </div>
  );
};

export default Editor;
