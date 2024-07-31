import { ReactNode, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";

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
        classNames={TRANSITION_CLASS_NAME}
        timeout={TRANSITION_DURATION_MS}
        nodeRef={nodeRef}
      >
        <SAnimatedWrapper ref={nodeRef}>{children}</SAnimatedWrapper>
      </CSSTransition>
    </SwitchTransition>
  );
}

const TRANSITION_CLASS_NAME = "opacity-switch-transition";

const SAnimatedWrapper = styled.div`
  transition: opacity ease-in-out ${TRANSITION_DURATION_MS}ms;
  &.${TRANSITION_CLASS_NAME}-enter {
    opacity: 0;
  }
  &.${TRANSITION_CLASS_NAME}-enter-active {
    opacity: 1;
  }

  &.${TRANSITION_CLASS_NAME}-exit {
    opacity: 1;
  }
  &.${TRANSITION_CLASS_NAME}-exit-active {
    opacity: 0;
  }
`;
