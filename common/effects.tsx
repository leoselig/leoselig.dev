import { css, keyframes } from "styled-components";

export const ANIMATION_EASING = `cubic-bezier(.61,0,.3,1)`;
const ENTER_ANIMATION_DURATION_MS = 1000;
const ENTER_ANIMATION_DURATION = `${ENTER_ANIMATION_DURATION_MS}ms`;
export const TRAPEZOID_ANGLE = 11;

export function trapezoidClipPath() {
  const percentage = 100 * getTrapezoidExtendedSideLengthRatio();

  return `polygon(${percentage}% 0%, 100% 0%, ${
    100 - percentage
  }% 100%, 0% 100%)`;
}

export function trapezoidClipPathHidden() {
  return `polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%)`;
}

export function trapezoidClipPathFullRectangle() {
  return `polygon(0% 0%,100% 0%,100% 100%,0% 100%)`;
}

const trapezoidEnterAnimationKeyFrames = keyframes`
from {
  clip-path: ${trapezoidClipPathHidden()};
}
to {
  clip-path: ${trapezoidClipPath()};
}`;

const defaultTrapezoidEnterAnimationStyles = css`
  clip-path: ${trapezoidClipPathHidden()};
  animation-name: ${trapezoidEnterAnimationKeyFrames};
  animation-duration: ${ENTER_ANIMATION_DURATION};
  animation-fill-mode: forwards;
  animation-delay: 500ms;
  animation-iteration-count: 1;
  animation-timing-function: ${ANIMATION_EASING};
`;

export function trapezoidEnterAnimationStyles() {
  return defaultTrapezoidEnterAnimationStyles;
}

export function trapezoidTightXMarginPull() {
  return getTrapezoidExtendedSideLengthRatio();
}

export function getTrapezoidExtendedSideLengthRatio(base = 1) {
  const alpha = degToRad(90);
  const beta = degToRad(TRAPEZOID_ANGLE);
  return (base / Math.sin(alpha)) * Math.sin(beta);
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
