// VintageNews.tsx

import React from "react";
import { useParams } from "react-router-dom";
import { bannerData } from "../../src/data/Banner_data";

const VintageNews = () => {
  const { id } = useParams<{ id?: string }>(); // Add ? to mark id as optional
  const imageIndex = id ? parseInt(id, 10) : undefined; // Handle undefined case

  if (typeof imageIndex !== 'number' || isNaN(imageIndex)) {
    return <div>Invalid image index</div>;
  }

  const image = bannerData.find((img) => img.id === imageIndex);

  return (
    <div>
      {image ? (
        <div>
          <h2>Vintage News</h2>
          <img src={image.url} alt={`Banner ${imageIndex}`} />
          {/* Add more details about the image if needed */}
        </div>
      ) : (
        <div>Image not found</div>
      )}
    </div>
  );
};

export default VintageNews;
