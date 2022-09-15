import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getDidabaraJoinItems, REQUEST_ADDRESS } from "../config/APIs";
import {
  didabaraItemState,
  didabaraSelector,
  didabaraState,
  menuState,
  myListOrJoinList,
} from "../config/Atom";

const Container = styled.div`
  width: 100% - 40px;
  height: calc(100% -45px);
  padding: 0px 20px;
`;
const MenuBar = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid grey;
`;
const List = styled.ul`
  position: relative;
  list-style: none;
  padding-left: 0;
  display: flex;
  z-index: 0;
`;
const Item = styled.li`
  cursor: pointer;
  padding: 5px 15px;
`;
const Indicator = styled.span`
  height: 3px;
  border-radius: 3px;
  background-color: #1976d2;
  position: absolute;
  bottom: 0px;
  transition: 0.3s;
`;
const ListConatainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 250px);
  grid-template-rows: repeat(3, 200px);
  justify-content: center;
  margin-top: 15px;
  gap: 10px;
`;
const PDF = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 125px;
    cursor: pointer;
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  div h4 {
    width: 60%;
    color: #2f3640;
    margin-block-start: 0.8rem;
    margin-block-end: 0.8rem;
    align-self: center;
    cursor: pointer;
  }
  div span {
    /* display: block; */
    width: 60%;
    height: 3rem;
    color: #2f3640;
    align-self: center;
    cursor: pointer;

    overflow: hidden; // 을 사용해 영역을 감출 것
    text-overflow: ellipsis; // 로 ... 을 만들기
    /* white-space: nowrap; //아랫줄 내려가기 막음 */
  }
`;
const Nullbox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  h4 {
    color: #5656fa;
    cursor: pointer;
  }
`;
const Nullsign = styled.span`
  font-size: 2rem;
`;
function SubscriptionList({ loading }) {
  const filteredList = useRecoilValue(didabaraSelector);
  const [didabara, setDidabara] = useRecoilState(didabaraState);
  const setDidabataItems = useSetRecoilState(didabaraItemState);
  const setList = useSetRecoilState(myListOrJoinList);
  const setMenu = useSetRecoilState(menuState);
  const param = useParams();
  const location = useLocation();
  const navi = useNavigate();
  const indicatorRef = useRef();
  const listingRef = useRef();

  const currentDocument = didabara.join.find(
    (page) => page.id == param.document
  );

  const handleMenuState = (e) => {
    setMenu(e.target.innerText);
    indicatorRef.current.style.left = e.target.offsetLeft + "px";
    indicatorRef.current.style.width = e.target.offsetWidth + "px";
  };

  useEffect(() => {
    if (!loading) {
      listingRef.current.click();
    }
  }, []);

  useEffect(() => {
    if (!didabara.join.length) {
      return;
    }
    if (didabara?.join.length) {
      navi(`/dashboard/publicboard/${didabara?.join[0].id}`);
      setList(didabara.join[0].id);
    }
  }, []);

  const cancleSubscribtion = () => {
    const bool = window.confirm("해당 커뮤니티 구독을 취소하시겠습니까");

    if (bool) {
      axios
        .delete(REQUEST_ADDRESS + `subscriber/delete/${location.state.id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setDidabara((prev) => {
            return { ...prev, join: res.data };
          });
          getDidabaraJoinItems().then((res) => {
            setDidabataItems(res.data.resList);
          });
          if (didabara?.join.length) {
            setList(didabara.join[0].id);
            navi(`/dashboard/publicboard/${didabara.join[0].id}`);
          }
          navi("/dashboard/publicboard");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Container>
        <h1>{currentDocument?.title}</h1>
        <MenuBar>
          <List onClick={handleMenuState}>
            <Item ref={listingRef}>Listing</Item>
            <Item>Out Dated</Item>
            <Item>All List</Item>
          </List>
          <List>
            <Item>Members</Item>
            <Item onClick={cancleSubscribtion}>구독 해지</Item>
          </List>
          <Indicator ref={indicatorRef}> </Indicator>
        </MenuBar>
        <ListConatainer>
          {filteredList ? (
            filteredList.map((item, idx) => {
              // if (item.category == param.document)
              return (
                <PDF height={125} key={idx}>
                  <img
                    src={item.preview}
                    onClick={() => {
                      navi(`/dashboard/pages/${item.id}`, {
                        state: { item: item },
                      });
                    }}
                  />

                  <div>
                    <h4>{item.title}</h4>
                    <span>{item.content}</span>
                  </div>
                </PDF>
              );
            })
          ) : (
            <Nullbox>
              <Nullsign>게시된 글이 존재하지 않습니다.</Nullsign>
            </Nullbox>
          )}
        </ListConatainer>
      </Container>
    </>
  );
}

export default SubscriptionList;
