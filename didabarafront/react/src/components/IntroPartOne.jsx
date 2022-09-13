import { Button, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import InfoHardCodingText from "../items/InfoHardCodingText";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState, userState } from "../config/Atom";

/**컴포넌트들 스타일 정의 */
const StyledGrid = styled(Grid)`
  width: 100%;
  height: 100vh;
  background-color: white;
`;

const StyledButton = styled(Button)`
  && {
    color: white;
    font-weight: bold;
    height: 55px;
    background-color: orange;
    transition: color 0.3s ease-in-out;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      color: black;
      background-color: white;
    }
  }
`;

function IntroPartOne({ children }) {
  //유저 로그인상태 관리. 유저가 로그인이면 시작해보기 버튼은 대시보드 기능을하고
  //유저가 비 로그인 상태라면 시작해보기 버튼은 로그인창을 불러온다.
  const user = useRecoilValue(userState);
  const setLoginState = useSetRecoilState(loginState);
  const navi = useNavigate();

  const handleStart = () => {
    if (user.id !== null) {
      navi("/dashboard");
    } else {
      setLoginState(true);
    }
  };

  return (
    <StyledGrid container justifyContent="center" gap={0}>
      {children}
      <StyledButton variant="contained" onClick={handleStart}>
        지금 바로 시작해보기
      </StyledButton>
    </StyledGrid>
  );
}

export default IntroPartOne;
