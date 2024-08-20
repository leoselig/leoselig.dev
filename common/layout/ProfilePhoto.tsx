// @ts-ignore
import Image, { ImageProps } from "next/image";
import classNames from "classnames";

import profileImageUrl from "../../public/profile-photo.jpeg";

import styles from "./ProfilePhoto.module.css";

export function ProfilePhoto({
  className,
  ...otherProps
}: Omit<ImageProps, "alt" | "src">) {
  return (
    <Image
      src={profileImageUrl}
      alt="Photo of Leo Selig"
      sizes="(min-width: 768px) 300px, 50vw"
      className={classNames(styles.image, className)}
      {...otherProps}
    />
  );
}
