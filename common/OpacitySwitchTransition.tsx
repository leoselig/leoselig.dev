import { ReactNode, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import styles from "./OpacitySwitchTransition.module.css";

const TRANSITION_DURATION_MS = 500;

type TProps = {
  elementKey: string;
  children: ReactNode;
};

export function OpacitySwitchTransition({ elementKey, children }: TProps) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  return (
    <SwitchTransition>
      <CSSTransition
        key={elementKey}
        classNames={{
          enter: styles.enter,
          enterActive: styles["enter-active"],
          exit: styles.exit,
          exitActive: styles["enter-active"],
        }}
        timeout={TRANSITION_DURATION_MS}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className={styles.root}>
          {children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}
