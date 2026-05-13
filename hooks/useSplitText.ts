"use client";

import { useEffect, useRef } from "react";

interface SplitTextOptions {
  type?: "chars" | "words" | "lines" | "chars,words" | "chars,words,lines";
}

export function useSplitText(
  ref: React.RefObject<HTMLElement>,
  options: SplitTextOptions = {}
) {
  const splitRef = useRef<unknown>(null);

  useEffect(() => {
    if (!ref.current) return;

    let split: { revert: () => void } | null = null;

    const init = async () => {
      const SplitType = (await import("split-type")).default;
      split = new SplitType(ref.current!, {
        types: options.type || "chars,words",
      });
      splitRef.current = split;
    };

    init();

    return () => {
      split?.revert();
    };
  }, [ref, options.type]);

  return splitRef;
}
