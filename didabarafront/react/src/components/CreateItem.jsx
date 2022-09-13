import axios from "axios";
import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { REQUEST_ADDRESS } from "../config/APIs";
import { categoryItem, didabaraItemState } from "../config/Atom";
import ModalPopUp from "./ModalPopUp";

const Container = styled.div`
  padding: 20px;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px 10px;
`;
const ClosingButton = styled.button`
  position: absolute;
  width: 60px;
  height: 26px;
  font-weight: bold;
  border-radius: 13px;
  top: 10px;
  right: 15px;
  cursor: pointer;
`;
const TitleAndContent = styled.input`
  height: 50px;
  padding-left: 20px;
  border-radius: 10px;
  border: 1px solid #2f3640;
  color: #2f3640;
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  &:valid {
    color: #1976d2;
  }
  &:focus {
    outline: none;
  }

  &.title {
    font-size: 1rem;
  }
  &.content {
    font-size: 1rem;
  }
  &:valid ~ span,
  &:focus ~ span {
    color: #1976d2;
    font-size: 0.72rem;
    transform: translateX(15px) translateY(-5px);
    padding: 0px 10px;
    background-color: white;
    border-left: 1px solid #1976d2;
    border-right: 1px solid #1976d2;
    letter-spacing: 0.2em;
  }
`;

const Text = styled.span`
  position: absolute;
  left: 40px;
  transition: 0.3s;
  pointer-events: none;
  font-size: 1rem;
  text-transform: uppercase;
`;

function CreateItem({ id, control }) {
  const setCategoryItem = useSetRecoilState(categoryItem);
  const setDidabaraItem = useSetRecoilState(didabaraItemState);
  const formRef = useRef();

  // useEffect(()=>{
  //   formRef.current.
  // },[])

  const eraiseInfomation = () => {
    formRef.current.title.value = "";
    formRef.current.content.value = "";
    formRef.current.expiredDate.value = "";
  };
  const sendCreateRequest = (e) => {
    e.preventDefault();
    console.log("아이디", id);
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
        eraiseInfomation();
        setDidabaraItem(res.data.resList);
      })
      .catch((err) => {
        eraiseInfomation();
        console.log(err);
      });
  };
  const close = () => {
    eraiseInfomation();
    control.current.style.display = "none";
  };
  return (
    <ModalPopUp width={"800px"} height={"650px"} Overlay={true}>
      <Container>
        <StyledForm onSubmit={sendCreateRequest} ref={formRef}>
          <div>
            <TitleAndContent
              type="text"
              name="title"
              className="title"
              required
            ></TitleAndContent>
            <Text>title here</Text>
          </div>
          <div>
            <TitleAndContent
              type="text"
              name="content"
              className="content"
              required
            ></TitleAndContent>
            <Text>content here</Text>
          </div>
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
