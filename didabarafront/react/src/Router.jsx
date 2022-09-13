import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";
import Join from "./pages/Join";
import KakaoLogin from "./pages/KakaoLogin";
import EmailAuth from "./pages/EmailAuth";
import { useRecoilState, useRecoilValue } from "recoil";
import { AnimatePresence } from "framer-motion";
import { loginState, userState } from "./config/Atom";
import Mypage from "./pages/Mypage";
import PersonalInfo from "./pages/PersonalInfo";
import NavigationBar from "./components/NavigationBar";
import MypageMain from "./pages/MypageMain";
import Loginform from "./components/Loginform";
import CreateModal from "./components/CreateModal";
import AvatarPickerModal from "./components/AvatarPickerModal";
import { useQuery } from "react-query";
import { getUserData } from "./config/APIs";
import DocumentList from "./components/DocumentList";
import FindInfo from "./pages/FindInfo";
import SubscriptionMain from "./pages/SubscriptionMain";
import DeleteAccount from "./pages/DeleteAccount";

function Router() {
  const isLogin = useRecoilValue(loginState);
  const [user, setUser] = useRecoilState(userState);

  const { isLoading } = useQuery("userData", getUserData, {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => setUser(data),
  });

  return (
    <>
      {isLoading ? null : (
        <>
          {" "}
          <NavigationBar />
          <AnimatePresence>{isLogin ? <Loginform /> : null}</AnimatePresence>
          <Routes>
            <Route path="/*" element={<Navigate to={!user && "/"} />} />
            {/* {!user && (
          <> */}
            <Route path="/kakaologin" element={<KakaoLogin />} />
            <Route path="/join" element={<Join />} />
            <Route path="/emailconfig/:username" element={<EmailAuth />} />
            <Route path="/find-info" element={<FindInfo />} />
            {/* </>
        )}
        {user && (
          <> */}
            <Route path="/dashboard" element={<DashBoard />}>
              <Route path="/dashboard/:document" element={<DocumentList />} />
            </Route>
            <Route path="/dashboard/create" element={<CreateModal />} />

            <Route path="/mypage" element={<Mypage />}>
              <Route path="main" element={<MypageMain />} />
              <Route path="personal-info" element={<PersonalInfo />} />
              <Route path="updateimage" element={<AvatarPickerModal />} />
              <Route path="unnamed03" element={<SubscriptionMain />} />
            </Route>
            {/* </>
        )} */}
            <Route path="/" element={<Home />} />
            <Route path="/deleted" element={<DeleteAccount />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default Router;
