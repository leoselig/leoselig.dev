import { memo, useMemo } from "react";
import styled from "styled-components";

import { ANIMATION_EASING, degToRad, TRAPEZOID_ANGLE } from "./effects";

export const MORPH_DIVIDER_TRANSITION_DURATION = 200;

const PathSVG = styled.svg`
  stroke: none;
  fill: var(--color);
  path {
    transition: d ${ANIMATION_EASING} ${MORPH_DIVIDER_TRANSITION_DURATION}ms,
      stroke-width ${ANIMATION_EASING} ${MORPH_DIVIDER_TRANSITION_DURATION}ms;
  }
`;

const DEFAULT_WIDTH = 50;
const DEFAULT_HEIGHT = 80;

function buildPath([[firstX, firstY], ...points]: [
  [number, number],
  ...Array<[number, number]>
]) {
  return `M ${firstX} ${firstY} ${points.map(([x, y]) => `${x} ${y}`)} Z`;
}

function buildToRight(
  width: number,
  height: number,
  strokeWidth: number,
  xPadding: number
) {
  return buildPath([
    [width - strokeWidth - xPadding, 0],
    [width - xPadding, 0],
    [width / 2 + strokeWidth / 2, height / 2],
    [width - xPadding, height],
    [width - strokeWidth - xPadding, height],
    [width / 2 - strokeWidth / 2, height / 2],
  ]);
}

function buildToLeft(
  width: number,
  height: number,
  strokeWidth: number,
  xPadding: number
) {
  return buildPath([
    [0 + xPadding, 0],
    [strokeWidth + xPadding, 0],
    [width / 2 + strokeWidth / 2, height / 2],
    [strokeWidth + xPadding, height],
    [0 + xPadding, height],
    [width / 2 - strokeWidth / 2, height / 2],
  ]);
}

function buildDefault(
  width: number,
  height: number,
  strokeWidth: number,
  xPadding: number
) {
  return buildPath([
    [width - xPadding - strokeWidth, 0],
    [width - xPadding, 0],
    [width / 2 + strokeWidth / 2, height / 2],
    [0 + xPadding + strokeWidth, height],
    [0 + xPadding, height],
    [width / 2 - strokeWidth / 2, height / 2],
  ]);
}

type TProps = {
  state: "default" | "toRight" | "toLeft";
  width?: number;
  height?: number;
};

export const MorphDivider = memo(function MorphDivider({
  state,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...otherProps
}: TProps) {
  const paths = useMemo(() => {
    const widthToMatchAngle = calculateWidthToMatchAngle(height);

    const paddingToMatchAngle = (width - widthToMatchAngle) / 2;
    return {
      default: buildDefault(width, height, 3, paddingToMatchAngle - 4 / 2),
      toRight: buildToRight(width, height, 6, 0),
      toLeft: buildToLeft(width, height, 6, 0),
    };
  }, [height, width]);

  return (
    <PathSVG
      viewBox={`0 0 ${width} ${height}`}
      {...otherProps}
      preserveAspectRatio="xMidYMid"
      width={width}
      height={height}
    >
      <path d={paths[state]} />
    </PathSVG>
  );
});

export function getRelativeMorphDividerPadding(width: number, height: number) {
  const padding = (width - calculateWidthToMatchAngle(height)) / 2;
  return padding / width;
}

function calculateWidthToMatchAngle(height: number) {
  return (
    height * (Math.sin(degToRad(TRAPEZOID_ANGLE)) / Math.sin(degToRad(90)))
  );
}
