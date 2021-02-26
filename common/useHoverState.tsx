import { useCallback, useMemo, useState } from "react";

export function useHoverState() {
  const [isHovered, setIsHovered] = useState(false);

  const onPointerEnter = useCallback(() => setIsHovered(true), []);
  const onPointerLeave = useCallback(() => setIsHovered(false), []);

  return useMemo(
    () => ({ onPointerEnter, onPointerLeave, isHovered }),
    [isHovered, onPointerEnter, onPointerLeave]
  );
}
