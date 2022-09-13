import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { itemMenuSelector } from "../config/Atom";
import ReplyContents from "./ReplyContents";
import ReplyInput from "./ReplyInput";
import Viewer from "./Viewer";

const Grid = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 5% 65% 5% 25%;
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
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f1f3f5;
`;

function ViewContainer({ setPath }) {
  const documentList = useRecoilValue(itemMenuSelector);
  const [index, setIndex] = useState(0);

  const address = documentList[index].itemPath;
  const goNext = () => {
    setIndex((prev) => prev + 1);
  };
  console.log(documentList);
  return (
    <Grid>
      <Layout>
        <button
          onClick={() => {
            setPath(null);
          }}
        >
          나가기!
        </button>
        <button onClick={goNext}>앞에꺼!</button>
      </Layout>
      <Document>
        <Viewer path={address} />
      </Document>
      <Layout></Layout>
      <Reply>
        <ReplyContents />

        <ReplyInput />
      </Reply>
    </Grid>
  );
}

export default ViewContainer;
