
import { useState, useRef, useEffect } from "react";
import { createEditor } from './editor';

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

export default function LogicDesigner() {
  const [setContainer, editor] = useRete(createEditor);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setContainer(ref.current);
    }
  }, [setContainer]);

  return <div ref={ref} style={{ height: '100%', width: '100%' }}></div>;
}