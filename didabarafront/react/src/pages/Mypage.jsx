import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import MypageLists from "../components/MypageLists";
import MypageNavHeader from "../components/MypageNavHeader";

function Mypage() {
  return (
    <Grid container>
      <Grid
        component="nav"
        style={{ backgroundColor: "#f5f5f5", height: "100vh", width: "15%" }}
      >
        <MypageNavHeader />
        <MypageLists />
      </Grid>
      <Grid item style={{ width: "85%" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default Mypage;
