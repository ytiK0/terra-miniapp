import React, { useState, useEffect, useMemo, useRef } from "react";

const parseText = (text: string, palette: Record<string, string>) => {
  const regex = /<([a-z]+)>(.*?)<\/\1>|<br\s*\/?>/gi;
  const result: { text: string; color?: string; isBreak?: boolean }[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    const [fullMatch, color, content] = match;
    const offset = match.index ?? 0;

    if (offset > lastIndex) result.push({ text: text.slice(lastIndex, offset) });

    if (fullMatch.toLowerCase().startsWith("<br")) {
      result.push({ text: "", isBreak: true });
    } else {
      result.push({ text: content, color: palette[color] || color });
    }

    lastIndex = offset + fullMatch.length;
  }

  if (lastIndex < text.length) result.push({ text: text.slice(lastIndex) });

  return result;
};

export const TypingEffect: React.FC<{ text: string; speed?: number }> = ({ text, speed = 50 }) => {
  const parsedText = useMemo(() => parseText(text, { orange: "#F89007" }), [text]);
  const [displayedText, setDisplayedText] = useState<typeof parsedText>([]);
  const isTypingRef = useRef(true);
  const charIndexRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayedText([]);
    isTypingRef.current = true;
    charIndexRef.current = 0;
    lastTimeRef.current = null;

    if (speed === 0) {
      setDisplayedText(parsedText);
      isTypingRef.current = false;
      return () => {};
    }

    const animate = (time: number) => {
      if (!isTypingRef.current || charIndexRef.current >= text.length) return;
      if (lastTimeRef.current === null || time - lastTimeRef.current >= speed) {
        let currentCharCount = 0;
        const newDisplayed: typeof parsedText = [];

        for (const part of parsedText) {
          if (part.isBreak) {
            newDisplayed.push(part);
            continue;
          }

          if (currentCharCount + part.text.length <= charIndexRef.current + 1) {
            newDisplayed.push(part);
          } else {
            newDisplayed.push({
              text: part.text.slice(0, charIndexRef.current - currentCharCount + 1),
              color: part.color,
            });
            break;
          }
          currentCharCount += part.text.length;
        }

        setDisplayedText(newDisplayed);
        charIndexRef.current += 1;
        lastTimeRef.current = time;
      }

      if (charIndexRef.current < text.length) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        isTypingRef.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => frameRef.current && cancelAnimationFrame(frameRef.current);
  }, [text, parsedText, speed]);

  useEffect(() => {
    const handleClick = () => {
      if (isTypingRef.current) {
        setDisplayedText(parsedText);
        isTypingRef.current = false;
        frameRef.current && cancelAnimationFrame(frameRef.current);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [parsedText]);

  return (
    <span>
      {displayedText.map((part, i) =>
        part.isBreak ? <br key={i} /> : <span key={i} style={{ color: part.color }}>{part.text}</span>
      )}
    </span>
  );
};
