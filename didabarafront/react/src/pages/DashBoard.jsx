import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import styled from "styled-components";
import CreateModal from "../components/CreateModal";
import ShowMyList from "../components/ShowMyList";
import DnDropContext from "../components/DnDropContext";
import InviteInput from "../components/InviteInput";
import { Outlet, useNavigate } from "react-router-dom";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import Viewer from "../components/Viewer";
import ReplyInput from "../components/ReplyInput";

const Item = styled(Grid)`
  /* border: 1px solid black; */
`;
const StyledButton = styled(Button)`
  && {
    width: 50%;
    height: 100%;
    border-radius: 0px;
    font-size: 1rem;
    font-weight: bold;
    &:hover {
      background-color: inherit;
      color: inherit;
    }
    border-bottom: none !important;
  }
`;

const ButtonMyList = styled(StyledButton)`
  && {
    background-color: ${(props) => (props.$mylist ? "#EAEBEC" : "#1c2027")};
    color: ${(props) => (props.$mylist ? "#1c2027" : "#EAEBEC")};
    border: ${(props) => (props.$mylist ? "3px solid #1976D2" : "none")};
  }
`;
const ButtonJoinList = styled(StyledButton)`
  && {
    background-color: ${(props) => (!props.$mylist ? "#EAEBEC" : "#232830")};
    color: ${(props) => (!props.$mylist ? "#1c2027" : "#EAEBEC")};
    border: ${(props) => (!props.$mylist ? "3px solid #1976D2" : "none")};
  }
`;

const StyledGrid = styled(Grid)`
  && {
    background-color: #f1f3f5;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    ::-webkit-scrollbar {
      width: 1px;
    }
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: gray;
    }
  }
`;
const FristGrid = styled.div`
  background-color: #f1f3f5;
  height: 100%;
  display: grid;
  grid-template-rows: 5% 87% 8%;
`;

const SecondGrid = styled.div`
  display: grid;
  height: 100%;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  height: calc(100% - 45px);
`;

function DashBoard() {
  const [makeCategory, setMakeCategory] = useState(false);
  const [showList, setShowList] = useState(true);
  const [invite, setInvite] = useState(false);

  const menuSelect = (e) => {
    if (e.target.value === "myList") {
      setShowList(true);
    }
    if (e.target.value === "joinList") {
      setShowList(false);
    }
  };

  return (
    <Container>
      <FristGrid>
        <div>
          <ButtonJoinList
            onClick={menuSelect}
            $mylist={showList}
            value="joinList"
          >
            구독
          </ButtonJoinList>
          <ButtonMyList onClick={menuSelect} $mylist={showList} value="myList">
            나의 커뮤니티
          </ButtonMyList>
        </div>

        <div>{showList ? <ShowMyList /> : <DnDropContext />}</div>
        <div>
          {showList ? (
            <Button
              variant="contained"
              style={{ width: "100%", height: "100%" }}
              onClick={() => {
                setMakeCategory(true);
              }}
            >
              커뮤니티 생성
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ width: "100%", height: "100%" }}
              onClick={() => {
                setInvite(true);
              }}
            >
              초대코드가 있으신가요?
            </Button>
          )}
        </div>
      </FristGrid>
      <SecondGrid style={{ position: "relative" }}>
        {makeCategory && <CreateModal setShowing={setMakeCategory} />}
        {invite && <InviteInput setInvite={setInvite} />}
        <Outlet />
      </SecondGrid>
    </Container>
  );
}

export default DashBoard;
