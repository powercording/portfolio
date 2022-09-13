import React from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../config/Atom";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { REQUEST_ADDRESS } from "../config/APIs";
import { useState } from "react";
import { useEffect } from "react";
import t from "prop-types";
import ProfileImages from "./ProfileImages";
import("screw-filereader");

/**
 * 스타일 컴포넌트
 */
const number = window.innerWidth;
const Background = styled.div`
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  transition: hidden 0.5s;
`;

const StyledForm = styled.form`
  display: grid;
  height: 100%;
  align-self: center;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  && {
    display: grid;
    /* grid-template-columns: 55% 45%; */
    width: 25%;
    /* height: 500px; */
    position: fixed;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    top: 50%;
    transition: all 0.5s;
    padding: 20px 20px;
    min-height: 500px;
    min-width: 30%;
    @media screen and (max-width: 600px) {
      grid-template-columns: repeat(1, 1fr);
      overflow-y: scroll;
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  && {
    width: 150px;
    height: 150px;
  }
`;

/**
 * 프로필 이미지 미리보기
 */
export const AvatarPickerModal = (props) => {
  const [user, setUser] = useRecoilState(userState);
  const [file, setFile] = useState(
    `${user.profile_image_url + user.file_name}`
  );
  const imageRef = useRef();
  const navi = useNavigate();
  const { handleChangeImage, avatarImage } = props;

  useEffect(() => {
    if (!file || avatarImage) {
      setFile(URL.createObjectURL(avatarImage));
    }

    return () => {
      if (file) URL.revokeObjectURL(file);
    };
  }, [file, avatarImage]);

  const renderImage = (fileObject) => {
    fileObject.image().then((img) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const maxWidth = 256;
      const maxHeight = 256;

      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const width = (img.width * ratio + 0.5) | 0;
      const height = (img.height * ratio + 0.5) | 0;

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        const resizedFile = new File([blob], file.name, fileObject);
        setFile(URL.createObjectURL(resizedFile));
      });
    });
  };

  //   const showOpenFileDialog = () => {
  //     imageRef.current.click();
  //   };

  const handleChange = (event) => {
    const fileObject = event.target.files[0];
    if (!fileObject) return;
    renderImage(fileObject);
  };

  /**
   * 프로필 이미지 변경 (post)
   */
  const updateProfileImg = (event) => {
    event.preventDefault();
    const file = new FormData(event.target);

    axios
      .post(REQUEST_ADDRESS + "userinfo/updateprofile", file, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "content-Type": "multipart/form-data",
        },
      })
      .then((res) =>
        setUser({
          ...user,
          profile_image_url: res.data.substring(0, res.data.indexOf("myfile")),
          file_name: res.data.substring(res.data.indexOf("myfile")),
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Background style={{ width: number }}></Background>
      <StyledForm encType="multipart/form-data" onSubmit={updateProfileImg}>
        <StyledCard>
          <Grid container direction="row">
            <Grid item xs={11}>
              <Typography variant="h4">프로필 이미지 변경</Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={() => {
                  navi(-1);
                }}
              >
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Grid
            item
            id="fileName"
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              backgroundColor: "lightgray",
            }}
          >
            <Grid item>
              <StyledAvatar src={file} alt={"avatar"}></StyledAvatar>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item>
              <Button htmlFor="file">불러오기</Button>
              <Input
                ref={imageRef}
                id="file"
                name="images"
                type="file"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Button>삭제하기</Button>
            </Grid>
          </Grid>
          <Grid container>
            <Typography variant="h5">기본 이미지에서 선택하기</Typography>
            <ProfileImages />
          </Grid>
          <Grid item>
            <Button type="submit">등록하기</Button>
          </Grid>
        </StyledCard>
      </StyledForm>
    </>
  );
};

AvatarPickerModal.prototype = {
  handleChangeImage: t.func.isRequired,
  avatarImage: t.object,
};

export default AvatarPickerModal;
