import { css, FlattenSimpleInterpolation } from "styled-components";

export type TViewportType = "phone" | "portrait" | "landscape" | "large";

export type ResponsiveMap<TValue, TOptional extends boolean = false> =
  TOptional extends true
    ? {
        [size in TViewportType]?: TValue;
      }
    : {
        [size in TViewportType]: TValue;
      };

const BREAKPOINT_PORTRAIT = 768;
const BREAKPOINT_LANDSCAPE = 1024;
const BREAKPOINT_LARGE = 1280;

const MEDIA_QUERY_PHONE = createRange(null, BREAKPOINT_PORTRAIT);
const MEDIA_QUERY_PORTRAIT = createRange(
  BREAKPOINT_PORTRAIT,
  BREAKPOINT_LANDSCAPE
);
const MEDIA_QUERY_LANDSCAPE = createRange(
  BREAKPOINT_LANDSCAPE,
  BREAKPOINT_LARGE
);
const MEDIA_QUERY_LARGE = createRange(BREAKPOINT_LARGE, null);

export function responsive({
  phone,
  portrait,
  landscape,
  large,
}: ResponsiveMap<FlattenSimpleInterpolation, true>) {
  return css`
    ${phone &&
    css`
      @media ${MEDIA_QUERY_PHONE} {
        ${phone}
      }
    `}
    ${portrait &&
    css`
      @media ${MEDIA_QUERY_PORTRAIT} {
        ${portrait}
      }
    `}
    ${landscape &&
    css`
      @media ${MEDIA_QUERY_LANDSCAPE} {
        ${landscape}
      }
    `}
    ${large &&
    css`
      @media ${MEDIA_QUERY_LARGE} {
        ${large}
      }
    `}
  `;
}

function createRange(from: number | null, to: number | null): string {
  if (from === null) {
    return `(max-width: ${to}px)`;
  }

  if (to === null) {
    return `(min-width: ${from - 1}px)`;
  }

  return `(min-width: ${from + 1}px) and (max-width: ${to}px)`;
}

export const MAX_WIDTH_PX = 1280;
export const MAX_WIDTH = `${MAX_WIDTH_PX}px`;

export function maxWidthLeftPadding(padding: string) {
  return `max(calc((100vw - ${MAX_WIDTH}) / 2), ${padding})`;
}
