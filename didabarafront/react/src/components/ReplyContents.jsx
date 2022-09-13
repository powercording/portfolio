import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import axios from "axios";
import React from "react";
import styled from "styled-components";
import { REQUEST_ADDRESS } from "../config/APIs";

const ReplyBox = styled.div`
  padding: 0px 10px;
`;
const Wrapper = styled.div`
  border-bottom: 1px solid grey;
  padding: 0px 10px;
`;
const WriterAndDate = styled.div`
  display: grid;
  grid-template-columns: 60% 20% 20%;
`;
const TextBox = styled.div`
  width: 100%;
  overflow: auto;
  word-break: break-all;
`;

function ReplyContents({ reply }) {
  const deleteReply = () => {
    axios
      .delete(REQUEST_ADDRESS + `categoryItemReply/delete/${reply.id}`, {
        headers: {
          Autorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(reply.id);
        console.log(res);
      })
      .catch((err) => console.log(reply.id));
  };

  return (
    <ReplyBox>
      <Wrapper>
        <WriterAndDate>
          <h5 style={{ lineHeight: "50%" }}>{reply.writer}</h5>
          <p style={{ justifySelf: "end" }}>{reply.date}</p>
          <DeleteForeverOutlinedIcon
            style={{
              justifySelf: "end",
              alignSelf: "center",
              cursor: "pointer",
            }}
            onClick={deleteReply}
          />
        </WriterAndDate>
        <TextBox>
          <p style={{ lineHeight: "100%" }}>{reply.content}</p>
        </TextBox>
      </Wrapper>
    </ReplyBox>
  );
}

export default ReplyContents;
