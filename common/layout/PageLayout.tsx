import { Fragment, HTMLProps, ReactNode, useMemo } from "react";
import classNames from "classnames";

import { textStyles } from "../text";

import { Footer } from "./Footer";
import styles from "./PageLayout.module.css";

export type TLayout = {};

type TProps = {
  content: ReactNode;
  heroImage: ReactNode;
} & Omit<HTMLProps<HTMLDivElement>, "content">;

export function PageLayout({
  className,
  content,
  heroImage,
  ...otherProps
}: TProps) {
  const yearsExperience = useMemo(() => new Date().getFullYear() - 2015, []);
  return (
    <div className={classNames(styles.root, className)} {...otherProps}>
      <header className={styles.header}>
        <div className={styles.title}>Leo Selig</div>
        <div className={styles["hero-image-container"]}>{heroImage}</div>
        <div className={classNames(textStyles.base, styles.subline)}>
          <div className={styles["subline-inner"]}>
            {[
              "Freelancer",
              "Software Engineer",
              `${yearsExperience} years of experience`,
              "Berlin area",
            ].map((text, index) => (
              <Fragment key={index}>
                {index !== 0 && (
                  <div
                    className={classNames(
                      styles["subline-item-split"],
                      index % 2 === 0 && styles["even"],
                      index % 2 === 1 && styles["odd"],
                    )}
                  />
                )}
                <div
                  className={classNames(
                    styles["subline-item-text"],
                    index % 2 === 0 && styles["even"],
                    index % 2 === 1 && styles["odd"],
                  )}
                >
                  {text}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.content}>{content}</div>

      <Footer className={styles.footer} />
    </div>
  );
}
