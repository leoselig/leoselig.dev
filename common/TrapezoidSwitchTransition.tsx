import { ReactNode } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";

import {
  ANIMATION_EASING,
  trapezoidClipPathFullRectangle,
  trapezoidClipPathHidden,
} from "./effects";

const TRANSITION_DURATION_MS = 500;

type TProps = {
  elementKey: string;
  children: ReactNode;
};

export function TrapezoidSwitchTransition({ elementKey, children }: TProps) {
  return (
    <SwitchTransition>
      <CSSTransition
        key={elementKey}
        classNames={TRANSITION_CLASS_NAME}
        timeout={TRANSITION_DURATION_MS}
      >
        <SAnimatedWrapper>{children}</SAnimatedWrapper>
      </CSSTransition>
    </SwitchTransition>
  );
}

const TRANSITION_CLASS_NAME = "trapezoid-switch-transition";

const SAnimatedWrapper = styled.div`
  transition: clip-path ${ANIMATION_EASING} ${TRANSITION_DURATION_MS}ms;
  &.${TRANSITION_CLASS_NAME}-enter {
    clip-path: ${trapezoidClipPathHidden()};
  }
  &.${TRANSITION_CLASS_NAME}-enter-active {
    clip-path: ${trapezoidClipPathFullRectangle()};
  }

  &.${TRANSITION_CLASS_NAME}-exit {
    clip-path: ${trapezoidClipPathFullRectangle()};
  }
  &.${TRANSITION_CLASS_NAME}-exit-active {
    clip-path: ${trapezoidClipPathHidden()};
  }
`;
