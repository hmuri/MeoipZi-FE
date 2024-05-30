import React from "react";
import styled from "styled-components";
import Button from "../ui/Button";

interface Reply {
  parentId: string; // Assuming parentId is the ID of the parent comment
  content: string;
  username: string; // Add the username property if it exists
  id: string;
}

interface ReplyListItemProps {
  reply: Reply;
  currentUser: string;
  onDeleteReply: (id: string) => void; // Use number instead of string for commentId
}

const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 8px 16px; /* Reduced padding for smaller margin */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  margin-bottom: 8px; /* Reduced margin between items */
  &:hover {
    background: lightgrey;
  }
  
  &::before { /* Adding ">" symbol before each comment */
    content: ">";
    color: #666; /* Adjust the color of the ">" symbol */
    margin-right: 8px; /* Add spacing between ">" symbol and comment text */
  }
`;
const ContentText = styled.p`
  font-size: 14px;
`;

const DataText = styled.p`
    font-size: 10px;
    color: #a9a9a9;

`

const ReplyListItem: React.FC<ReplyListItemProps> = ({ reply, currentUser, onDeleteReply }) => {
  const { id, content, username } = reply; // Destructure the properties
  return (
    <Wrapper>
        <DataText>{`${reply.username}`}</DataText>
      <ContentText>{content}</ContentText>
      {currentUser === username && (
        <Button
          title="Delete"
          onClick={() => onDeleteReply(id)} // Pass the ID to onDeleteReply
          // Add any styling or icons for the delete button
        />
      )}
    </Wrapper>
  );
};

export default ReplyListItem;

