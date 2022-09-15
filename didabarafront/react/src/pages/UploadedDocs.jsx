import { Container, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { REQUEST_ADDRESS } from "../config/APIs";
import {
  categoryItem,
  didabaraItemState,
  didabaraState,
  userState,
} from "../config/Atom";

function UploadedDocs() {
  const didabaraItem = useRecoilValue(didabaraItemState);

  return (
    <>
      <Container>
        <Grid style={{ margin: "3%" }}>
          <Typography variant="h4">업로드 문서</Typography>
          <Typography variant="subtitle1">
            내가 업로드한 문서의 목록입니다.
          </Typography>
          <Divider style={{ marginTop: "10px" }} />
        </Grid>
      </Container>

      <Container>
        <Grid container>
          {didabaraItem.map((item, index) => {
            return (
              <Grid item key={index}>
                <Grid item xs={2}>
                  <img src={item.preview} width="150px" />
                  {item.title}
                  {item.content}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default UploadedDocs;
