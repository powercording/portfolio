import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getItemReply } from "../config/APIs";
import ReplyContents from "./ReplyContents";
import ReplyInput from "./ReplyInput";
import Viewer from "./Viewer";

const Grid = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: 15% 65% 20%;
  top: 0;
  z-index: 4;
`;
const Document = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f1f3f5;
`;
const Reply = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  overflow: hidden;
`;
const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
`;
const StyledBottun = styled.button`
  width: 100%;
  height: 75px;
  background-color: #2f3640;
  font-size: 1.5rem;
  letter-spacing: 2px;
  color: #f1f3f5;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #556274;
  }
`;
const Box = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
`;
const ReplyWrapper = styled.div`
  overflow-y: scroll;
`;

function ViewContainer() {
  const navi = useNavigate();
  const location = useLocation();
  const item = location.state.item;

  const [replyList, setReplyList] = useState([]);
  //로직 작성 해야함
  // const deleteReply = () => {
  //   axios.delete(REQUEST_ADDRESS + `categoryItemReply/delete/${""}`);
  // };

  const { isLoading } = useQuery("reply", () => getItemReply(item.id), {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (data) => {
      console.log("이페이지의 리플라이:", data.data.resList);
      setReplyList(data.data.resList);
    },
  });

  //로직 작성 해야함
  // const deleteReply = () => {
  //   axios.delete(REQUEST_ADDRESS + `categoryItemReply/delete/${""}`);
  // };

  return (
    <Grid>
      <Layout>
        <StyledBottun
          onClick={() => {
            navi(-1);
          }}
        >
          뒤로가기
        </StyledBottun>

        <Box>
          <h4>{item.title}</h4>
          <p>{item.content}</p>
        </Box>
      </Layout>
      <Document>
        <Viewer path={item.itemPath} />
      </Document>

      <Reply>
        <ReplyWrapper>
          {isLoading
            ? "Loading T.T..."
            : replyList.map((reply) => {
                return <ReplyContents reply={reply} key={reply.id} />;
              })}
        </ReplyWrapper>

        <ReplyInput item={item.id} setReply={setReplyList} />
      </Reply>
    </Grid>
  );
}

export default ViewContainer;
