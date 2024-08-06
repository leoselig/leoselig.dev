import { HTMLProps } from "react";
import classNames from "classnames";

import { Link } from "../Link";
import { contactData } from "../pageData";
import { Headline2 } from "../text";

import styles from "./ContactSection.module.css";

type Props = HTMLProps<HTMLDivElement>;

export default function ContactSection({ ...otherProps }: Props) {
  return (
    <div {...otherProps}>
      <Headline2>Reach out</Headline2>
      <div className={styles["contact-method-grid"]}>
        <div>{contactData.labels.phone}:</div>
        <div className={styles["contact-data"]}>
          <Link to={`tel:${contactData.phoneNumber.replace(/[ ()\-]/g, "")}`}>
            {contactData.phoneNumber}
          </Link>
        </div>
        <div>{contactData.labels.email}:</div>
        <div className={styles["contact-data"]}>
          <Link to={`mailto:${contactData.emailAddress}`}>
            {contactData.emailAddress}
          </Link>
        </div>

        <div>{contactData.labels.signal}:</div>
        <div className={classNames(styles["contact-data"], styles.monospace)}>
          {contactData.signalUsername}
        </div>
      </div>
    </div>
  );
}
