// import { Avatar, Divider, List, ListItem, Typography } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useRecoilState } from "recoil";
// import { REQUEST_ADDRESS } from "../config/APIs";
// import { myDocumentState, userState } from "../config/Atom";

const columns = [
  { id: "title", label: "이름", minWidth: 100 },
  { id: "count", label: "참가자수", minWidth: 50 },
  { id: "date", label: "개설일", minWidth: 70 },
  { id: "inviteCode", label: "초대코드", minWidth: 70 },
];

function createData(title, count, date, inviteCode) {
  return { title, count, date, inviteCode };
}

const rows = [
  createData("카테고리1", 100, "2022-09-13", "AA1234"),
  createData("카테고리2", 99, "2022-09-11", "Adf2r4"),
  createData("카테고리3", 20, "2022-09-01", "Be36Y"),
];

export default function MyCategoryList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePages = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
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
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.count}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.inviteCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
