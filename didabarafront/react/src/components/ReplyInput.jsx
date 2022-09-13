import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Send } from "@mui/icons-material";

const StyledButton = styled(Button)`
  && {
    width: 100%;
    height: 100%;
    color: #f1f3f5;
    border-radius: 0;
    background-color: rgb(47, 54, 64);
    &:hover {
      background-color: rgb(30, 37, 46);
    }
  }
`;

const StyledGrid = styled(Grid)`
  background-color: #dcdcdc;
`;
const StyledText = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
});

function ReplyInput() {
  const replyRequest = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    for (let item of data.entries()) {
      console.log(item);
    }

    // axios.post("리플라이주소", data, {
    //   headers: {
    //     Authorization: "bearer " + localStorage.getItem("token"),
    //   },
    // });
  };

  return (
    <form onSubmit={replyRequest}>
      <StyledGrid container justifyContent={"center"}>
        <Grid item xs={10} height={95}>
          <StyledText
            fullWidth
            multiline
            rows={3}
            name="reply"
            placeholder="Add comment..."
          />
        </Grid>
        <Grid item xs={2}>
          <StyledButton type="submit" variant="text">
            <Send />
          </StyledButton>
        </Grid>
      </StyledGrid>
    </form>
  );
}

export default ReplyInput;
