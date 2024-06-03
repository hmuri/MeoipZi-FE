import React from "react";
import styled from "styled-components";
import ReplyListItem from "./ReplyListItems";

interface Reply {
    parentId: string; // Assuming parentId is the ID of the parent comment
    content: string;
    username: string; // Add the username property if it exists
    id: string; // Add the id property if it exists
  }

interface ReplyListProps {
  replies: Reply[]; // Define the prop for the list of replies
  currentUser: string;
  onDeleteReply: (id: string) => void; // Use number instead of string for replyId
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  & > * {
    :not(:last-child) {
      margin-bottom: 8px; /* Reduce margin between reply items */
    }
  }

  margin-left: 20px; /* Indentation for the list of replies */
`;

const ReplyList: React.FC<ReplyListProps> = ({ replies, currentUser, onDeleteReply }) => {
  return (
    <Wrapper>
      {replies.map((reply) => (
        <ReplyListItem key={reply.id} reply={reply} currentUser={currentUser} onDeleteReply={onDeleteReply} />
      ))}
    </Wrapper>
  );
};

export default ReplyList;

