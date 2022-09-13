import axios from "axios";
import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { REQUEST_ADDRESS } from "../config/APIs";
import { categoryItem } from "../config/Atom";
import ModalPopUp from "./ModalPopUp";

const Container = styled.div`
  padding: 20px;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ClosingButton = styled.button`
  position: absolute;
  width: 60px;
  height: 26px;
  font-weight: bold;
  border-radius: 13px;
  top: 10px;
  right: 15px;
`;
const TitleAndContent = styled.input`
  height: 50px;
  border-radius: 10px;
  border: 1px solid #2f3640;
  color: #2f3640;
  &:focus {
    outline: none;
  }

  &.title {
    font-size: 2rem;
  }
  &.content {
    font-size: 1.2rem;
  }
`;

function CreateItem({ id, control }) {
  const setCategoryItem = useSetRecoilState(categoryItem);
  const sendCreateRequest = (e) => {
    e.preventDefault();
    const originalData = new FormData(e.target);
    const REQUESTDATA = new FormData();

    const categoryItem = {
      title: originalData.get("title"),
      content: originalData.get("content"),
      expiredDate: originalData.get("expiredDate"),
    };

    const categoryItemDTO = JSON.stringify(categoryItem);
    REQUESTDATA.append(
      "categoryItemDTO",
      new Blob([categoryItemDTO], { type: "application/json" })
    );
    REQUESTDATA.append("file", originalData.get("file"));

    axios
      .post(REQUEST_ADDRESS + `categoryItem/create/page/${id}`, REQUESTDATA, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setCategoryItem(res.data.resList);
      })
      .catch((err) => console.log(err));
  };
  const close = () => {
    control.current.style.display = "none";
  };
  return (
    <ModalPopUp width={"800px"} height={"650px"} Overlay={true}>
      <Container>
        {id} 아이템만들기 CreateItem
        <StyledForm onSubmit={sendCreateRequest}>
          <TitleAndContent
            type="text"
            name="title"
            className="title"
          ></TitleAndContent>
          <TitleAndContent
            type="text"
            name="content"
            className="content"
          ></TitleAndContent>
          <input type="file" name="file"></input>
          <input type="date" name="expiredDate"></input>
          <button type="submit">보내기</button>
        </StyledForm>
        <ClosingButton onClick={close}>X</ClosingButton>
      </Container>
    </ModalPopUp>
  );
}

export default CreateItem;
