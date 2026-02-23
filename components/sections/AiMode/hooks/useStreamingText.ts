import { useState, useEffect, useRef } from 'react';

const WORD_INTERVAL = 30;

export function useStreamingText(
  fullText: string,
  isStreaming: boolean,
): string {
  const [displayed, setDisplayed] = useState('');
  const wordsRef = useRef<string[]>([]);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayed(fullText);
      return;
    }

    wordsRef.current = fullText.split(/(\s+)/);
    indexRef.current = 0;
    setDisplayed('');

    const timer = setInterval(() => {
      indexRef.current++;
      const slice = wordsRef.current.slice(0, indexRef.current).join('');
      setDisplayed(slice);

      if (indexRef.current >= wordsRef.current.length) {
        clearInterval(timer);
      }
    }, WORD_INTERVAL);

    return () => clearInterval(timer);
  }, [fullText, isStreaming]);

  return displayed;
}
