import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreatePost } from "./pages/CreatePost";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Search } from "./pages/Search";
import { Signup } from "./pages/Signup";
import { User } from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage/:id" element={<User />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/search/:query" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
