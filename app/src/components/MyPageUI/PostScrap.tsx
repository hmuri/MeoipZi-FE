import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 33%; /* Set width to 1/3 of the viewport */
  float: left; /* Float left to align side by side */
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px); /* 3 columns with 100px width */
  gap: 15px; /* Gap between grid items */
  margin: 8px; /* Margin on top and bottom */
`;

const Image = styled.img`
  width: 100%; /* Image width */
  height: 100%; /* Image height */
`;

interface PostScrapProps {
  scrapData: any; // Define the scrapData prop
}

const PostScrap: React.FC<PostScrapProps> = ({ scrapData }) => {
  const [scrapedOutfits, setScrapedOutfits] = useState<any[]>([]);
  const [scrapedProducts, setScrapedProducts] = useState<any[]>([]);

  useEffect(() => {
    if (scrapData && scrapData.scrapedOutfits) {
      setScrapedOutfits(scrapData.scrapedOutfits);
    }
    if (scrapData && scrapData.scrapedProducts) {
      setScrapedProducts(scrapData.scrapedProducts);
    }
  }, [scrapData]);

  return (
    <Container>
      <div>
        <h3>Scraped Outfits</h3>
        <ImageGrid>
          {scrapedOutfits.map((outfit: any) => (
            <Image key={outfit.id} src={outfit.imgUrl} alt={`Outfit ${outfit.id}`} />
          ))}
        </ImageGrid>
      </div>
      <div>
        <h3>Scraped Products</h3>
        <ImageGrid>
          {scrapedProducts.map((product: any) => (
            <Image key={product.id} src={product.imgUrl} alt={`Product ${product.id}`} />
          ))}
        </ImageGrid>
      </div>
    </Container>
  );
};

export default PostScrap;
