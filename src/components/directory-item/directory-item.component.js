import React from "react";
import {
  DirectoryItemContainer,
  DirectoryItemBody,
} from "./directory-item.styles";

function DirectoryItem({ category }) {
  const { title, imageUrl } = category;
  return (
    <DirectoryItemContainer>
      {/* img */}
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <DirectoryItemBody>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
