// @ts-ignore
import profileImageUriWebPSizes from "../../public/profile-photo.jpeg?format=webp&resize&sizes[]=128&sizes[]=240&sizes[]=360";
// @ts-ignore
import profileImageJpegSizes from "../../public/profile-photo.jpeg?resize&sizes[]=128&sizes[]=240&sizes[]=360";

import styles from "./ProfilePhoto.module.css";

export function ProfilePhoto({ ...otherProps }) {
  return (
    <div className={styles["aspect-ratio"]} {...otherProps}>
      <picture className={styles.picture}>
        <source srcSet={profileImageUriWebPSizes.srcSet} type="image/webp" />
        <source srcSet={profileImageJpegSizes.srcSet} type="image/jpeg" />
        <img className={styles.image} alt="Picture of Leo Selig" />
      </picture>
    </div>
  );
}
