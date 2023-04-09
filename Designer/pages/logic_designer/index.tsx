
import { useState, useRef, useEffect } from "react";
import { createEditor } from "./editor";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

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

export default function Test() {
  const [setContainer, editor] = useRete(createEditor);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setContainer(ref.current);
    }
  }, [setContainer]);

  const [jsonData, setJsonData] = useState('');

  async function fetchJSON() {
    const data = await editor?.getJSON();
    setJsonData(JSON.stringify(data));
  }

  return (
    <div>
      <div ref={ref} style={{ height: '100vh', width: '100vw' }}></div>
      <textarea className="w-100" value={jsonData}></textarea>
      <button onClick={fetchJSON}>GET DATA</button>
    </div>
  );
}