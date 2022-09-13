import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import styled from "styled-components";
import { REQUEST_ADDRESS } from "../config/APIs";
import { categoryIdState, categoryItem } from "../config/Atom";

const Container = styled.div`
  border-radius: 0;
  cursor: pointer;
  padding: 5px 10px;
  background-size: cover;
  background-position: center center;
  margin-bottom: 1px;
  transition: all 0.3s ease-in-out;
  :hover {
    scale: 1.1;
  }
`;

const StyledWapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border-radius: 5px;
  padding: 0px 10px;
  height: 25px;
  align-items: center;
  margin: 5px;
`;

function MyList({ title, content, imgSrc, id, code, host }) {
  const navi = useNavigate();
  const setCategoryItems = useSetRecoilState(categoryItem);

  const goCategory = () => {
    console.log("getting my item list of categories...");

    axios
      .get(REQUEST_ADDRESS + `categoryItem/list/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCategoryItems(res.data.resList);
        console.log(res.data.resList);
        navi(`/dashboard/${id}`, {
          state: {
            inviteCode: code,
            host: host,
          },
        });
      });
  };

  return (
    <Container
      style={{ backgroundImage: `url(${imgSrc})` }}
      onClick={goCategory}
    >
      <StyledWapper>
        <Box>
          <StyledSpan>
            <h5
              style={{
                lineHeight: "50%",
                marginBlockStart: "1rem",
                marginBlockEnd: "1rem",
              }}
            >
              {title}
            </h5>
          </StyledSpan>
          <StyledSpan>
            <p style={{ lineHeight: "50%" }}>{content}</p>
          </StyledSpan>
        </Box>
      </StyledWapper>
    </Container>
  );
}

export default MyList;
