import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

const columns = [
  { id: "title", label: "이름", minWidth: 170 },
  { id: "count", label: "참가자수", minWidth: 50 },
  { id: "date", label: "개설일", minWidth: 70 },
  { id: "inviteCode", label: "초대코드", minWidth: 70 },
];

function createData(title, count, date, inviteCode) {}

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
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {columns.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.count}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return <TableCell key={columns.id}></TableCell>;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
