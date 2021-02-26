import styled from "styled-components";

// @ts-ignore
import profileImageUriWebPSizes from "../../public/profile-photo.jpeg?format=webp&resize&sizes[]=128&sizes[]=240&sizes[]=360";
// @ts-ignore
import profileImageJpegSizes from "../../public/profile-photo.jpeg?resize&sizes[]=128&sizes[]=240&sizes[]=360";

const SPicture = styled.picture`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const SImage = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const SAspectRatio = styled.div`
  position: relative;

  width: 100%;
  padding-bottom: 100%;
`;

export function ProfilePhoto({ ...otherProps }) {
  return (
    <SAspectRatio {...otherProps}>
      <SPicture>
        <source srcSet={profileImageUriWebPSizes.srcSet} type="image/webp" />
        <source srcSet={profileImageJpegSizes.srcSet} type="image/jpeg" />
        <SImage alt="Picture of me" />
      </SPicture>
    </SAspectRatio>
  );
}
