import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import React from "react";

function ReplyContents() {
  //로직 작성 해야함
  const deleteReply = () => {};

  return (
    <div style={{ padding: "0px 10px" }}>
      <div style={{ borderBottom: "1px solid grey", padding: "0px 10px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "60% 20% 20%",
          }}
        >
          <h5 style={{ lineHeight: "50%" }}>Writer</h5>
          <p style={{ justifySelf: "end" }}>date</p>
          <DeleteForeverOutlinedIcon
            style={{
              justifySelf: "end",
              alignSelf: "center",
              cursor: "pointer",
            }}
            onClick={deleteReply}
          />
        </div>

        <p style={{ lineHeight: "50%" }}>Contents</p>
      </div>
    </div>
  );
}

export default ReplyContents;
