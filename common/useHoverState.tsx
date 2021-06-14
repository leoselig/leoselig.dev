import { PointerEventHandler, useCallback, useMemo, useState } from "react";

export function useHoverState() {
  const [isHovered, setIsHovered] = useState(false);

  const onPointerEnter = useCallback<PointerEventHandler>(
    (event) => event.pointerType !== "touch" && setIsHovered(true),
    []
  );
  const onPointerLeave = useCallback<PointerEventHandler>(
    (event) => event.pointerType !== "touch" && setIsHovered(false),
    []
  );

  return useMemo(
    () => ({ onPointerEnter, onPointerLeave, isHovered }),
    [isHovered, onPointerEnter, onPointerLeave]
  );
}
