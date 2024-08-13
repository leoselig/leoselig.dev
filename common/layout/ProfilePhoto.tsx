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
      sizes="(max-width: 768px) 50vw, (max-width: 1279px) 40vw, 30vw"
      className={classNames(styles.image, className)}
      {...otherProps}
    />
  );
}
