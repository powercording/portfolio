// import { Avatar, Divider, List, ListItem, Typography } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useRecoilState } from "recoil";
// import { REQUEST_ADDRESS } from "../config/APIs";
// import { myDocumentState, userState } from "../config/Atom";

// function MyCategoryList() {
//   const [user] = useRecoilState(userState);
//   const [category] = useRecoilState(myDocumentState);

//   return (
//     <div>
//       <List>
//         {category.map((list) => (
//           <ListItem
//             key={list.id}
//             title={list.title}
//             content={list.content}
//             imgSrc={list.profileImageUrl}
//             id={list.id}
//           >
//             <Typography>{list.title}</Typography>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// }

// export default MyCategoryList;
