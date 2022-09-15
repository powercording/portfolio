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
import FindInfo from "./pages/FindInfo";
import SubscriptionMain from "./pages/SubscriptionMain";
import Loginform from "./components/Loginform";
import CreateModal from "./components/CreateModal";
import AvatarPickerModal from "./components/AvatarPickerModal";
import { useQuery } from "react-query";
import { getUserData } from "./config/APIs";
import DocumentList from "./components/DocumentList";
import ViewContainer from "./components/ViewContainer";
import SubscriptionList from "./components/SubscriptionList";

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
            {/* <Route path="/*" element={<Navigate to={!user && "/"} />} /> */}
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
              <Route
                path="/dashboard/myboard/:document"
                element={<DocumentList />}
              />
              <Route path="/dashboard/myboard/" element={<DocumentList />} />
              <Route
                path="/dashboard/publicboard/:document"
                element={<SubscriptionList />}
              />
              <Route
                path="/dashboard/publicboard"
                element={<SubscriptionList />}
              />
            </Route>
            <Route path="/dashboard/pages/:docId" element={<ViewContainer />} />
            <Route path="/mypage" element={<Mypage />}>
              <Route path="main" element={<MypageMain />} />
              <Route path="personal-info" element={<PersonalInfo />} />
              <Route path="updateimage" element={<AvatarPickerModal />} />
              <Route path="unnamed03" element={<SubscriptionMain />} />
            </Route>
            {/* </>
        )} */}
            <Route path="/" element={<Home />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default Router;
