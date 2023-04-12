
import { useState, useRef, useEffect } from 'react';

export function useRete<T extends (el: HTMLElement) => Promise<{ destroy: () => void }>>(
  create: T,
) {
  type Editor = Awaited<ReturnType<typeof create>>;
  const [container, setContainer] = useState(null);
  const editorRef = useRef<Editor>(null);
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    if (container) {
      create(container).then(value => {
        (editorRef as any).current = value;
        setEditor(value as Editor);
      });
    }
  }, [container]);

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return [setContainer, editor] as const;
}

export * from './editor';