import React, { useRef } from "react";
import ModalPopUp from "./ModalPopUp";
import styled from "styled-components";
import axios from "axios";
import { REQUEST_ADDRESS } from "../config/APIs";
import { useSetRecoilState } from "recoil";
import { didabaraState } from "../config/Atom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border: 1px solid #2f3640;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  box-shadow: 3px 3px 7px 1px #2f3640;
`;
const StyledButton = styled.button`
  text-align: center;
  width: 90%;
  height: 50px;
  align-self: center;
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid darkgray;
  color: darkgray;
  cursor: pointer;
  &:hover {
    background-color: #3c86cf;
    color: white;
  }
`;
const StyledInput = styled.input`
  width: 90%;
  height: 50px;
  align-self: center;
  border-radius: 10px;
  background-color: transparent;
  border: 1px solid darkgray;
  padding-left: 20px;
  &:focus {
    outline: none;
    border-color: #3c86cf;
  }
  &:valid {
    border: 1px solid #1976d2;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 10px;
  right: 10px;
  border-radius: 15px;
  border: 1px solid darkgray;
  font-weight: bold;
  color: grey;
  cursor: pointer;
  &:hover {
    background-color: grey;
    color: white;
  }
`;
function InviteInput({ setInvite }) {
  const inputRef = useRef();
  const setDidabara = useSetRecoilState(didabaraState);

  const closeWindow = () => {
    setInvite(false);
  };

  const handleInvite = () => {
    axios
      .post(
        REQUEST_ADDRESS + "subscriber/create",
        { inviteCode: inputRef.current.value },
        // categoryDTO,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setDidabara((prev) => {
          return { ...prev, join: [...res.data] };
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <ModalPopUp width={"50%"} height={"20%"}>
      <Container>
        <StyledInput type="text" name="inviteCode" ref={inputRef} required />
        <StyledButton onClick={handleInvite}>보내기</StyledButton>
      </Container>
      <CloseButton onClick={closeWindow}>X</CloseButton>
    </ModalPopUp>
  );
}

export default InviteInput;
