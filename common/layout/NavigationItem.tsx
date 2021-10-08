import { memo } from "react";
import styled from "styled-components";

import { FONT_STYLES_PAGE_LINK } from "../fonts";
import { Link } from "../Link";

const Item = styled.div`
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  isCurrentRoute: boolean;
};

export const NavigationItem = memo(function NavigationItem({
  route,
  title,
  isCurrentRoute,
  ...otherProps
}: TProps) {
  return (
    <Item {...otherProps}>
      <SLink
        to={route}
        showActive={isCurrentRoute}
        makeBackgroundPaddingBleed={false}
      >
        {title}
      </SLink>
    </Item>
  );
});
