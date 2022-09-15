import {
  Avatar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { renderMatches, useParams } from "react-router-dom";
import { REQUEST_ADDRESS } from "../config/APIs";

const columns = [
  { id: "img", label: "" },
  { id: "nickname", label: "닉네임" },
  { id: "date", label: "가입일" },
];

function CategoryUserList({ categoryId }) {
  const [userList, setUserList] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      url: REQUEST_ADDRESS + `subscriber/list/${categoryId}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => setUserList(res.data));
  }, []);

  console.log(userList);

  return userList?.length ? (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns &&
              columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {userList &&
            userList.map((list, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Avatar src={list.profileImageUrl} />
                </TableCell>
                <TableCell>{list.nickname}</TableCell>
                <TableCell>{list.createdDate}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4">아직 유저가 없습니다</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CategoryUserList;
