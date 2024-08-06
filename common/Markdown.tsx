import { ComponentProps, useMemo } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkBreaksPlugin from "remark-breaks";
import remarkDirectivePlugin from "remark-directive";
import classNames from "classnames";

import { Link } from "./Link";
import textStyles from "./text.module.css";
import styles from "./Markdown.module.css";

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
      <Link to={href ?? ""} className={styles.link} {...otherProps}>
        {children}
      </Link>
    );
  },
  em: function MarkdownEM({ children, node, ...otherProps }) {
    return (
      <em {...otherProps} className={styles.meta}>
        {children}
      </em>
    );
  },
  h1: function MarkdownH1({ children, ref, node, ...otherProps }) {
    return (
      <h1
        className={classNames(
          textStyles["text-base"],
          textStyles["headline-base"],
          textStyles.h1,
        )}
        {...otherProps}
      >
        {children}
      </h1>
    );
  },
  h2: function MarkdownH2({ children, ref, node, ...otherProps }) {
    return (
      <h2
        className={classNames(
          textStyles["text-base"],
          textStyles["headline-base"],
          textStyles.h2,
        )}
        {...otherProps}
      >
        {children}
      </h2>
    );
  },
  h3: function MarkdownH3({ children, ref, node, ...otherProps }) {
    return (
      <h3
        className={classNames(
          textStyles["text-base"],
          textStyles["headline-base"],
          textStyles.h3,
        )}
        {...otherProps}
      >
        {children}
      </h3>
    );
  },
  p: function MarkdownP({ children, ref, node, ...otherProps }) {
    return (
      <p
        className={classNames(textStyles["text-base"], textStyles.paragraph)}
        {...otherProps}
      >
        {children}
      </p>
    );
  },
  ul: function MarkdownUl({ children, ref, node, ...otherProps }) {
    return (
      <ul className={classNames(styles.ul)} {...otherProps}>
        {children}
      </ul>
    );
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
        <p
          className={classNames(textStyles["text-base"], textStyles.paragraph)}
        >
          {children}
        </p>
      </li>
    );
  },
};
