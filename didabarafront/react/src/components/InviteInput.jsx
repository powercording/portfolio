import React, { useRef } from "react";
import ModalPopUp from "./ModalPopUp";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border: 1px solid darkgray;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
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
    background-color: darkgray;
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
  &:focus {
    outline: none;
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

  const closeWindow = () => {
    setInvite(false);
  };

  const handleInvite = () => {
    console.log(inputRef.current.value);
  };
  return (
    <ModalPopUp width={"50%"} height={"20%"}>
      <Container>
        <StyledInput type="text" name="inviteCode" ref={inputRef} />
        <StyledButton onClick={handleInvite}>보내기</StyledButton>
      </Container>
      <CloseButton onClick={closeWindow}>X</CloseButton>
    </ModalPopUp>
  );
}

export default InviteInput;
