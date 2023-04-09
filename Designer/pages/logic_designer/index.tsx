
import { useState, useRef, useEffect } from "react";
import { createEditor } from "./editor";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export function useRete(create: (el: HTMLElement) => Promise<() => void>) {
  const [container, setContainer] = useState(null);
  const editorRef = useRef<Awaited<ReturnType<typeof create>>>(null);

  useEffect(() => {
    if (container) {
      create(container).then(value => {
        (editorRef as any).current = value;
      });
    }
  }, [container]);

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current();
      }
    };
  }, []);

  return [setContainer];
}

export default function Test() {
  const [setContainer] = useRete(createEditor);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setContainer(ref.current);
    }
  }, [ref.current]);

  return (
    <div>
      <div ref={ref} style={{ height: '100vh', width: '100vw' }}></div>
    </div>
  );
}