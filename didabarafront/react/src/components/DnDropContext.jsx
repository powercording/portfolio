import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DropBox from "./DropBox";

function DnDropContext() {
  const dragEng = (DropResult) => {
    console.log(DropResult);
  };

  return (
    <DragDropContext onDragEnd={dragEng}>
      <div
        style={{ padding: "2px", backgroundColor: "#DCDCDC", height: "100%" }}
      >
        <DropBox />
      </div>
    </DragDropContext>
  );
}

export default DnDropContext;
