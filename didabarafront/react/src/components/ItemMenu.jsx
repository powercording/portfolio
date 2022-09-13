import React from "react";
import styled from "styled-components";
import axios from "axios";
import { REQUEST_ADDRESS } from "../config/APIs";
import { useSetRecoilState } from "recoil";
import { categoryItem } from "../config/Atom";

const OutLineBox = styled.div`
  border-radius: 10px;
  background-color: #2f3640;
  color: #f1f3f5;
  padding: 0px 10px;
`;
const Menu = styled.ul`
  list-style: none;
  padding-left: 0;
`;
const Item = styled.li`
  padding: 5px 10px;
  border-radius: 10px;
  &:hover {
    background-color: #f1f3f5;
    color: #2f3640;
  }
`;

function ItemMenu({ id }) {
  const setCategoryItem = useSetRecoilState(categoryItem);
  const itemDrop = () => {
    const select = window.confirm("삭제하시겠습니까?");

    if (select) {
      axios
        .delete(REQUEST_ADDRESS + `categoryItem/delete/item-page/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setCategoryItem(res.data.resList);
          console.log(res);
        });
    }
  };
  return (
    <OutLineBox tabIndex="-1">
      <Menu>
        <Item>수정</Item>
        <Item onClick={itemDrop}>삭제</Item>
      </Menu>
    </OutLineBox>
  );
}

export default ItemMenu;
