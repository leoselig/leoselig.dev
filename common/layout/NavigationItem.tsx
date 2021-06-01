import { memo, useEffect, useRef } from "react";
import styled from "styled-components";

import { FONT_STYLES_PAGE_LINK } from "../fonts";
import { Link } from "../Link";
import { useHoverState } from "../useHoverState";

const Item = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  transition: letter-spacing ease-in-out 200ms;
  &:hover {
    letter-spacing: 0.1em;
  }
`;

const SLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  ${FONT_STYLES_PAGE_LINK};
  line-height: 1em;
`;

type TProps = {
  route: string;
  title: string;
  onHoverFocusChange: (route: string, isHovered: boolean) => unknown;
};

export const NavigationItem = memo(function NavigationItem({
  route,
  title,
  onHoverFocusChange,
  ...otherProps
}: TProps) {
  const { isHovered, ...hoverStateProps } = useHoverState();
  let lastReportedValue = useRef(isHovered);

  useEffect(() => {
    if (lastReportedValue.current !== isHovered) {
      lastReportedValue.current = isHovered;
      onHoverFocusChange(route, isHovered);
    }
  }, [isHovered, onHoverFocusChange, route]);

  return (
    <Item {...hoverStateProps} {...otherProps}>
      <SLink to={route}>{title}</SLink>
    </Item>
  );
});
