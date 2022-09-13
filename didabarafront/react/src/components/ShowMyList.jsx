import React from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getMyList } from "../config/APIs";
import { myDocumentState } from "../config/Atom";
import MyList from "./MyList";

const StyledGrid = styled.div`
  background-color: #dcdcdc;
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
`;

function ShowMyList() {
  const [myDocumentList, setList] = useRecoilState(myDocumentState);

  const { isLoading } = useQuery("myDocumentList", getMyList, {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      console.log("myDocumentList is....:", data);
      setList(data.data);
    },
  });

  return (
    <StyledGrid>
      {isLoading
        ? null
        : myDocumentList.map((list) => (
            <MyList
              key={list.id}
              title={list.title}
              content={list.content}
              imgSrc={list.profileImageUrl}
              id={list.id}
              code={list.inviteCode}
              host={list.host}
            />
          ))}
    </StyledGrid>
  );
}

export default ShowMyList;