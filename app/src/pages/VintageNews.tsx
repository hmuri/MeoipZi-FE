// VintageNews.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";

interface VintageNewsData {
  imgUrl: string;
}

const VintageNews = () => {
  const { id } = useParams<{ id?: string }>(); // Add ? to mark id as optional
  const [imgUrl, setImgUrl] = useState<string | undefined>();

  useEffect(() => {
    const fetchVintageNews = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/meoipzi/news/${id}`);
        const data: VintageNewsData = response.data;
        setImgUrl(data.imgUrl);
      } catch (error) {
        console.error("Error fetching vintage news:", error);
      }
    };

    if (id) {
      fetchVintageNews();
    }
  }, [id]); // Dependency array to re-fetch data when id changes

  if (!id) {
    return <div>No vintage news id provided</div>;
  }

  if (!imgUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Vintage News</h2>
      <img src={imgUrl} alt={`Vintage News ${id}`} />
      {/* Add more details about the vintage news if needed */}
    </div>
  );
};

export default VintageNews;
