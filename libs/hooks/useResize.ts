import React, { useCallback, useEffect, useRef, useState } from "react";

export interface UseResizeProps<T extends HTMLElement | undefined> {
  default?: {
    width: number;
    height: number;
  };
  existingRef?: React.RefObject<T>;
  onResize?: ({ width, height: height }: { width: number; height: number }) => void;
  onResizeDeps?: any[];
}


export default function useResize<T extends HTMLElement | undefined>(props?: UseResizeProps<T>) {
  const [currentSize, setCurrentSize] = useState(props?.default ?? { width: 0, height: 0 });
  const ref = useRef<T>(props?.existingRef?.current ?? null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onResize = useCallback(props?.onResize ?? (()=>{
    // do nothing
  }), [props?.onResize, ...props?.onResizeDeps ?? []]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {

      if (entries[0].borderBoxSize) {
        const { inlineSize, blockSize } = entries[0].borderBoxSize[0];
        setCurrentSize({ width: inlineSize, height: blockSize })
        onResize?.({ width: inlineSize, height: blockSize });

      } else {
        const { width, height } = entries[0].contentRect;
        setCurrentSize({ width, height });
        onResize?.({ width, height });

      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [onResize, ref]);

  return { ref, currentSize, setCurrentSize };

}
