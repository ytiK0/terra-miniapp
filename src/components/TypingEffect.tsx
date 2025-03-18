import React, {useState, useEffect, useMemo, useRef, ReactNode} from "react";
import {CircleInfo} from "@gravity-ui/icons";

type Palette = Record<string, string | JSX.Element>;


const parseText = (text: string, palette: Palette) => {
  const regex = /<([a-zA-Z0-9_-]+)(?:\/|>(.*?)<\/\1)?>/gi;
  const result: { text?: string; color?: string; component?: ReactNode }[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    const [fullMatch, tag, content] = match;
    const offset = match.index ?? 0;

    if (offset > lastIndex) {
      result.push({text: text.slice(lastIndex, offset)});
    }

    if (tag in palette) {
      if (typeof palette[tag] === "string" && content) {
        result.push({text: content, color: palette[tag] as string});
      } else {
        result.push({component: palette[tag]});
      }
    } else {
      result.push({text: fullMatch});
    }

    lastIndex = offset + fullMatch.length;
  }

  if (lastIndex < text.length) {
    result.push({text: text.slice(lastIndex)});
  }

  return result;
};

const infoIcon = <CircleInfo color={"#F88F07"} width={20} height={20}/>

export const TypingEffect: React.FC<{ text: string; speed?: number; }> = ({ text, speed = 25}) => {
  const parsedText = useMemo(() => parseText(text, {br: <br/>, orange: "#F89007", info: infoIcon}), [text]);
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
      return () => {
      };
    }

    const animate = (time: number) => {
      if (!isTypingRef.current || charIndexRef.current >= text.length) return;
      if (lastTimeRef.current === null || time - lastTimeRef.current >= speed) {
        let currentCharCount = 0;
        const newDisplayed: typeof parsedText = [];

        for (const part of parsedText) {
          if (part.component) {
            newDisplayed.push(part);
            continue;
          }

          if (currentCharCount + (part.text?.length || 0) <= charIndexRef.current + 1) {
            newDisplayed.push(part);
          } else {
            newDisplayed.push({
              text: part.text?.slice(0, charIndexRef.current - currentCharCount + 1),
              color: part.color,
            });
            break;
          }
          currentCharCount += part.text?.length || 0;
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
        part.component ? <React.Fragment key={i}>{part.component}</React.Fragment> :
          part.text ? <span key={i} style={{color: part.color}}>{part.text}</span> : null
      )}
    </span>
  );
};
