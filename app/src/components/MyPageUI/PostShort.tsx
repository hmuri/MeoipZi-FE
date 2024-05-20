import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../api/axios";

const ShortFormGrid = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr); /* 3 columns with equal width */
gap: 15px; /* Gap between grid items */
margin: 10px; /* Margin on top and bottom */
`;

const ShortFormItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
`;

const Video = styled.video`
  width: 100%;
  max-width: 300px;
`;

const SeeAllButton = styled.button`
  margin-top: 16px;
`;

interface ShortForm {
  id: number;
  imgUrl: string;
  createAt: string;
}

const PostShort: React.FC = () => {
  const [shortForms, setShortForms] = useState<ShortForm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchShortForms = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/posts/feeds/shortforms`);
        console.log("Fetched data:", response.data); // Debug log

        if (response.status === 200) {
          const transformedShortForms = response.data.map((item: any) => ({
            id: item.id,
            imgUrl: item.imgUrl,
            createAt: item.createAt,
          }));
          setShortForms(transformedShortForms);
          console.log("Transformed shortForms:", transformedShortForms); // Debug log
        } else {
          setError("Failed to fetch short forms");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch short forms");
      } finally {
        setIsLoading(false);
      }
    };

    fetchShortForms();
  }, []);

  const displayedShortForms = showAll ? shortForms : shortForms.slice(0, 2);

  const handleSeeAllClick = () => {
    setShowAll(true);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (shortForms.length === 0) {
    return <p>No videos available</p>;
  }

  return (
    <>
      <ShortFormGrid>
        {displayedShortForms.map((shortForm) => (
          <ShortFormItem key={shortForm.id}>
            <Video controls>
              <source src={shortForm.imgUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </Video>
            <p>{new Date(shortForm.createAt).toLocaleDateString()}</p>
          </ShortFormItem>
        ))}
      </ShortFormGrid>
      {!showAll && (
        <SeeAllButton onClick={handleSeeAllClick}>See All</SeeAllButton>
      )}
    </>
  );
};

export default PostShort;
