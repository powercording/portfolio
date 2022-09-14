import axios from "axios";
import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getItemReply, REQUEST_ADDRESS } from "../config/APIs";
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
  position: relative;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
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
const CheckButton = styled.button`
  width: 100%;
  height: 75px;
  background-color: #2f3640;
  font-size: 1rem;
  letter-spacing: 2px;
  color: #f1f3f5;
  cursor: pointer;
  border: none;
  margin-top: auto;
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
const ShiftMenu = styled.button`
  width: 40px;
  height: 40px;
  top: 50%;
  background-color: #ffffff;
  transform: translateY(-50%);
  border-radius: 20px;
  border: none;
  box-shadow: 1px 1px 4px 0px;
  cursor: pointer;
  position: absolute;
  right: 0;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  align-items: center; /* 가로 - 중앙으로 */
  justify-content: flex-start; /* 세로 - 상단으로 */
`;

function ViewContainer() {
  const navi = useNavigate();
  const [content, setContent] = useState(true);
  const location = useLocation();
  const item = location.state.item;

  console.log("아이템아이디", item.id, location);

  const [replyList, setReplyList] = useState([]);

  const { isLoading } = useQuery("reply", () => getItemReply(item.id), {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (data) => {
      console.log("이페이지의 리플라이:", data.data);
      setReplyList(data.data);
    },
  });

  const check = () => {
    axios
      .post(REQUEST_ADDRESS + `checked/create/item/${item.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res));
  };

  const changeContent = () => {
    setContent((prev) => !prev);
  };

  const getCheck = () => {
    axios
      .get(REQUEST_ADDRESS + `checked/list/item/${item.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res));
  };

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

        {content ? (
          <Box>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
          </Box>
        ) : (
          <button onClick={getCheck}>get!</button>
        )}
        <CheckButton onClick={check}>이 게시글을 확인했습니다.</CheckButton>
        <ShiftMenu onClick={changeContent}>&rArr;</ShiftMenu>
      </Layout>
      <Document>
        <Viewer path={item.itemPath} />
      </Document>

      <Reply>
        <ReplyWrapper>
          {isLoading ? (
            "Loading T.T..."
          ) : !replyList.length ? (
            <h4>현재 작성된 댓글이 없습니다.</h4>
          ) : (
            replyList.map((reply) => {
              return (
                <ReplyContents
                  reply={reply}
                  key={reply.id}
                  replyControl={setReplyList}
                />
              );
            })
          )}
        </ReplyWrapper>

        <ReplyInput item={item.id} setReply={setReplyList} />
      </Reply>
    </Grid>
  );
}

export default ViewContainer;
