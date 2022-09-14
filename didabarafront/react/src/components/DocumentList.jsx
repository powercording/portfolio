import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { REQUEST_ADDRESS } from "../config/APIs";
import { didabaraSelector, didabaraState, menuState } from "../config/Atom";
import CreateItem from "./CreateItem";
import ItemMenu from "./ItemMenu";
import Skeleton from "../items/Skeleton";
import { useEffect } from "react";

const Container = styled.div`
  width: 100% - 40px;
  height: calc(100% -45px);
  padding: 0px 20px;
`;
const ListConatainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 250px);
  grid-template-rows: repeat(3, 200px);
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
`;
const PDF = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 125;
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
const DeleteButton = styled.div`
  width: 80px;
  padding: 0px 20px;
  cursor: pointer;
`;
const Alert = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fccbd3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50px;
  border-radius: 10px;
  color: red;
  z-index: 1;
  top: 100px;
  button {
    position: absolute;
    color: white;
    background-color: transparent;
    cursor: pointer;
    border: none;
    right: 10px;
    top: 10px;
  }
  &.BOX {
    display: none;
  }
`;
const DotButtonBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row !important;
  right: 0;
  top: 0%;
  gap: 1px;
  z-index: 2;
  width: 30px !important;
  height: 10px;
  & :hover {
    cursor: pointer;
  }

  div {
    border-radius: 3px;
    width: 6px;
    height: 6px;
    background-color: #3e4855;
  }
`;
const HiddenMenu = styled.div`
  position: absolute;
  z-index: 2;
`;
const InvisibleOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
`;
const AddItembutton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 25px;
  color: #f1f3f5;
  background-color: #2f3640;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  right: 25px;
  bottom: 25px;
  &:hover {
    background-color: #1976d2;
  }
`;

function DocumentList({ loading }) {
  const setMenu = useSetRecoilState(menuState);
  const filteredList = useRecoilValue(didabaraSelector);
  const [didabara, setDidabara] = useRecoilState(didabaraState);
  const [makeItem, setMakeItem] = useState();
  const [openMenu, setOpenMenu] = useState();
  const indicatorRef = useRef();
  const listingRef = useRef();
  const messageRef = useRef();
  const codeRef = useRef();
  const itemRef = useRef();
  const navi = useNavigate();
  const param = useParams();

  const hasInvite = didabara?.create?.find((list) => {
    return list.id == param.document;
  });

  const code = hasInvite?.inviteCode;

  useEffect(() => {
    if (!loading) {
      listingRef.current.click();
    }
    if (loading) {
      listingRef.current.click();
    }
  }, []);

  /**
   *
   * @param {mouseClick} e.target 윈도우 대화창에서 boolean 값을 받아
   * true 면 해당 커뮤니티 삭제.
   */
  const deleteCategory = (e) => {
    const yesOrNo = window.confirm("해당 커뮤니티를 삭제 하시겠습니까??");

    if (yesOrNo) {
      axios
        .delete(REQUEST_ADDRESS + `category/delete/page/${param.document}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          navi("/dashboard");
          setDidabara((prev) => {
            return { ...prev, create: [...res.data.resList] };
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const printGuestList = () => {
    axios
      .get(REQUEST_ADDRESS + `subscriber/list/${param.document}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  /**
   *
   * @param {mouseClick} e 메뉴에서 Copy InviteCode 클릭시 인바이트코드 복사
   */
  const copyInviteCode = (e) => {
    codeRef.current.select();
    document.execCommand("copy");

    messageRef.current.classList.remove("BOX");

    setTimeout(() => {
      messageRef.current.classList.add("BOX");
    }, 3000);
  };

  /**
   * alert 창 닫기버튼. 누르지않아도 3초뒤 자동으로 닫히지만
   * 유저가 직접 닫을 수 있게 버튼 추가.
   */
  const hideAlert = () => {
    messageRef.current.classList.add("BOX");
  };

  /**
   *
   * @param {} e 상단 메뉴바 클릭시 메뉴바 이름으로
   * 로딩해올 다큐먼트 종류를 결정함.
   *
   * + 인디케이터 에니메이션
   */

  const handleMenuState = (e) => {
    setMenu(e.target.innerText);
    indicatorRef.current.style.left = e.target.offsetLeft + "px";
    indicatorRef.current.style.width = e.target.offsetWidth + "px";
  };

  /**
   * 아이템 생성 대화창 표시.
   * 기본값은 none 이고, 클릭시 block 으로 바뀌어 화면에 표시된다.
   */
  const openItemCreationBox = () => {
    itemRef.current.style.display = "block";
  };

  /**
   *
   * @param {*} e 점버튼 클릭시 해당 아이템의 메뉴를 출력.
   * 수정과 삭제 가능.
   */

  /**
   *
   * @param {*} e 메뉴바 오픈 상태에서 다른요소 클릭시
   * 메뉴바가 닫히도록 함.
   * 타임아웃 없이는 요소가 바로 none으로 되므로 요소안에 위치한 기능접근에 제한이 있음.
   */
  const onBlur = (e) => {
    setTimeout(() => {
      e.target.classList.toggle("show");
    }, 1000);
  };
  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Container>
            <MenuBar>
              <List onClick={handleMenuState}>
                <Item ref={listingRef}>Listing</Item>
                <Item>Out Dated</Item>
                <Item>All List</Item>
              </List>
              <List>
                <Item onClick={printGuestList}>Members</Item>
                <Item onClick={copyInviteCode}>Copy InviteCode</Item>
                <Item>수정</Item>
              </List>

              <Indicator ref={indicatorRef}></Indicator>

              <Alert className="BOX" ref={messageRef}>
                초대 코드가 복사되었습니다.
                <button onClick={hideAlert}>X</button>
              </Alert>
              <input
                type="text"
                value={code}
                readOnly
                ref={codeRef}
                style={{ left: "-5000px", position: "absolute" }}
              />
              <DeleteButton onClick={deleteCategory}>삭제</DeleteButton>
            </MenuBar>
            <ListConatainer>
              {filteredList ? (
                filteredList.map((item, idx) => {
                  return (
                    <PDF key={idx}>
                      <img
                        height={125}
                        src={item.preview}
                        onClick={() => {
                          navi(`/dashboard/pages/${item.id}`, {
                            state: { item: item },
                          });
                        }}
                      />

                      <div>
                        <h4
                          onClick={() => {
                            navi(`/dashboard/pages/${item.id}`, {
                              state: { item: item },
                            });
                          }}
                        >
                          {item.title}
                        </h4>
                        <span
                          onClick={() => {
                            navi(`/dashboard/pages/${item.id}`, {
                              state: { item: item },
                            });
                          }}
                        >
                          {item.content}
                        </span>
                      </div>
                      <DotButtonBox
                        onClick={() => {
                          setOpenMenu(item.id);
                        }}
                      >
                        <div></div>
                        <div></div>
                        <div></div>
                      </DotButtonBox>
                      {openMenu === item.id && (
                        <HiddenMenu>
                          <ItemMenu id={item.id} category={item.category} />
                        </HiddenMenu>
                      )}
                    </PDF>
                  );
                })
              ) : (
                <Nullbox>
                  <Nullsign>게시된 글이 존재하지 않습니다.</Nullsign>

                  <h4 onClick={openItemCreationBox}>작성하기</h4>
                </Nullbox>
              )}
              <AddItembutton onClick={openItemCreationBox}>+</AddItembutton>
              {/* {makeItem && <CreateItem setCreateItem={setMakeItem} />} */}
            </ListConatainer>
          </Container>
        </>
      )}
      <div ref={itemRef} style={{ display: "none" }}>
        <CreateItem control={itemRef} id={param.document} />
      </div>
      {openMenu && (
        <InvisibleOverlay
          onClick={() => {
            setOpenMenu(null);
          }}
        />
      )}
    </>
  );
}
export default DocumentList;
