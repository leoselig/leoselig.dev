import { ComponentProps, HTMLProps } from "react";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownProps } from "react-markdown/src/ast-to-react";
import remarkBreaksPlugin from "remark-breaks";
import remarkDirectivePlugin from "remark-directive";
import styled from "styled-components";

import { Link, SAnchor } from "./Link";
import { Headline1, Headline2, Headline3, Paragraph } from "./text";

type TProps = { data: string };

export function Markdown({ data }: TProps) {
  return (
    <ReactMarkdown components={components} remarkPlugins={plugins}>
      {data}
    </ReactMarkdown>
  );
}

const plugins = [remarkBreaksPlugin, remarkDirectivePlugin];
const components: ComponentProps<typeof ReactMarkdown>["components"] = {
  a: function MarkdownA({
    children,
    href,
    ...otherProps
  }: ReactMarkdownProps & HTMLProps<"a">) {
    return (
      <Link to={href ?? ""} {...otherProps}>
        {children}
      </Link>
    );
  },
  em: function MarkdownEM({ children, ...otherProps }) {
    return <SMeta {...otherProps}>{children}</SMeta>;
  },
  h1: function MarkdownH1({ children, ...otherProps }) {
    return <Headline1 {...otherProps}>{children}</Headline1>;
  },
  h2: function MarkdownH2({ children, ...otherProps }) {
    return <Headline2 {...otherProps}>{children}</Headline2>;
  },
  h3: function MarkdownH3({ children, ...otherProps }) {
    return <Headline3 {...otherProps}>{children}</Headline3>;
  },
  h4: function MarkdownH4({ children, ...otherProps }) {
    return <table {...otherProps}>{children}</table>;
  },
  h5: function MarkdownH5({ children, ...otherProps }) {
    return <table {...otherProps}>{children}</table>;
  },
  h6: function MarkdownH6({ children, ...otherProps }) {
    return <table {...otherProps}>{children}</table>;
  },
  hr: function MarkdownHR({ children, ...otherProps }) {
    return <table {...otherProps}>{children}</table>;
  },
  img: function MarkdownImg({ children, ...otherProps }) {
    return <table {...otherProps}>{children}</table>;
  },
  li: function MarkdownLi({ children, ...otherProps }) {
    return <table {...otherProps}>{children}</table>;
  },
  ol: function MarkdownOl({ children, ...otherProps }) {
    return <table {...otherProps}>{children}</table>;
  },
  p: function MarkdownP({ children, ...otherProps }) {
    return <Paragraph {...otherProps}>{children}</Paragraph>;
  },
  pre: function MarkdownPre({ children, ...otherProps }) {
    return <table {...otherProps}>{children}</table>;
  },
  strong: function MarkdownStrong({ children, ...otherProps }) {
    return <strong {...otherProps}>{children}</strong>;
  },
  ul: function MarkdownUL({ children, ...otherProps }) {
    return <table {...otherProps}>{children}</table>;
  },
};

const SMeta = styled.em`
  font-style: normal;
  color: ${({ theme }) => theme.colors.meta};

  > ${SAnchor}:not(:hover) {
    color: inherit;
  }
`;
