import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import "./Main.css";
import BuddyFind from "./page/BuddyFind";
import Body from "./components/Body";
import Chatting from "./page/Chatting";
import Introduction from "./page/Introduction";
import Shopping from "./page/Shopping";

import Board from "./page/Board";
import BuddyFindMap from "./components/BuddyFind-components/BuddyFindMap";
import BuddyFindSet from "./components/BuddyFind-components/BuddyFindSet";
// import BoardItem from "./components/Board-components/Board-Item";
import BoardWriting from "./components/Board-components/BoardWriting";
import Agree from "./components/Agree";
import FindemailPw from "./components/FindemailPw";
import LoginMain from "./components/LoginMain";
import MyPage from "./page/MyPage";

import Manager from "./page/Manager";

import ShoppingItemPage from "./components/Shopping-components/ShoppingItemPage";
import ShoppingAddItem from "./components/Shopping-components/ShoppingAddItem";
import Attendance from "./components/attendance";
import Cart from "./page/Cart";

function Main() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Body />}></Route>
          <Route path="BuddyFind" element={<BuddyFind />}>
            <Route index element={<BuddyFindMap />} />
            <Route path="buddyMy" element={<BuddyFindSet />} />
          </Route>
          <Route path="intro" element={<Introduction />} />
          <Route path="shopping">
            <Route index element={<Shopping />} />
            <Route path=":itemId" element={<ShoppingItemPage />} />
            <Route path="addItem" element={<ShoppingAddItem />} />
          </Route>
          <Route path="board">
            <Route index element={<Board />} />
            <Route path="writing" element={<BoardWriting />} />
          </Route>
          <Route path="Login">
            <Route index element={<LoginMain />} />
            <Route path="findempw" element={<FindemailPw />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="Agree">
              <Route index element={<Agree />} />
            </Route>
          </Route>
          <Route path="mypage" element={<MyPage />} />
          <Route path="manager" element={<Manager />} />
          <Route path="chatting" element={<Chatting />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="chatting" element={<Chatting />}></Route>
        <Route path="/ex" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
