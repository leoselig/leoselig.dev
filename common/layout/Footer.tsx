import { HTMLProps } from "react";
import classNames from "classnames";

import { Link } from "../Link";

import {
  getLinkFromNavigationItem,
  useNavigationItems,
} from "./navigationData";
import styles from "./Footer.module.css";

type Props = HTMLProps<HTMLElement>;

export function Footer({ className, ...otherProps }: Props) {
  const navigationItems = useNavigationItems("footer");

  return (
    <footer className={classNames(styles.root, className)} {...otherProps}>
      <div className={styles["copy-right-text"]}>
        © {new Date().getFullYear()}
      </div>
      <div className={styles["links-container"]}>
        {navigationItems.map((navigationItem) => (
          <Link
            className={styles.link}
            key={navigationItem.id}
            to={getLinkFromNavigationItem(navigationItem)}
            target={navigationItem.shouldOpenInNewWindow ? "_blank" : ""}
            enableBackgroundEffect={!navigationItem.Icon}
          >
            {navigationItem.Icon ? (
              <navigationItem.Icon
                className={styles["link-icon"]}
                title={navigationItem.title}
              />
            ) : (
              navigationItem.title
            )}
          </Link>
        ))}
      </div>
    </footer>
  );
}
