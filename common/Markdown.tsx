import { ComponentProps, useMemo } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkBreaksPlugin from "remark-breaks";
import remarkDirectivePlugin from "remark-directive";
import styled from "styled-components";

import { Link, SAnchor } from "./Link";
import { Headline1, Headline2, Headline3, Paragraph } from "./text";

type TProps = {
  data: string;
  components?: ComponentProps<typeof ReactMarkdown>["components"];
};

export function Markdown({ data, components: customComponents }: TProps) {
  const finalComponents = useMemo(
    () => ({ ...defaultCmponents, ...customComponents }),
    [customComponents],
  );
  return (
    <ReactMarkdown components={finalComponents} remarkPlugins={plugins}>
      {data}
    </ReactMarkdown>
  );
}

const plugins = [remarkBreaksPlugin, remarkDirectivePlugin];
const defaultCmponents: Components = {
  a: function MarkdownA({ children, href, node, ...otherProps }) {
    return (
      <Link to={href ?? ""} {...otherProps}>
        {children}
      </Link>
    );
  },
  em: function MarkdownEM({ children, node, ...otherProps }) {
    return <SMeta {...otherProps}>{children}</SMeta>;
  },
  h1: function MarkdownH1({ children, ref, node, ...otherProps }) {
    return <SMdHeadline1 {...otherProps}>{children}</SMdHeadline1>;
  },
  h2: function MarkdownH2({ children, ref, node, ...otherProps }) {
    return <SMdHeadline2 {...otherProps}>{children}</SMdHeadline2>;
  },
  h3: function MarkdownH3({ children, ref, node, ...otherProps }) {
    return <SMdHeadline3 {...otherProps}>{children}</SMdHeadline3>;
  },
  p: function MarkdownP({ children, ref, node, ...otherProps }) {
    return <SMdParagraph {...otherProps}>{children}</SMdParagraph>;
  },
  li: function MarkdownLi({ children: rawChildren, node, ...otherProps }) {
    const { children, isListItemTypeNoneText } = useMemo(() => {
      const isListItemTypeNoneText =
        typeof rawChildren === "string" && rawChildren.startsWith("X");
      return {
        isListItemTypeNoneText,
        children: isListItemTypeNoneText ? rawChildren.slice(1) : rawChildren,
      };
    }, [rawChildren]);

    return (
      <li
        {...otherProps}
        style={isListItemTypeNoneText ? { listStyleType: "none" } : {}}
      >
        <Paragraph>{children}</Paragraph>
      </li>
    );
  },
};

export const SMdHeadline1 = styled(Headline1)``;

export const SMdHeadline2 = styled(Headline2)``;

export const SMdHeadline3 = styled(Headline3)``;

const SMeta = styled.em`
  font-style: normal;
  color: var(--color-meta);

  > ${SAnchor}:not(:hover) {
    color: inherit;
  }
`;

export const SMdParagraph = styled(Paragraph)``;
