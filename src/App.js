import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InterestPage from "./pages/InterestPage";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home";
import CreateEventModal from "./components/CreateEventModal";
import ChatRoulette from "./components/ChatRoulette";
// import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="main-app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/interest-select" element={<InterestPage />} />
          <Route exact path="/mainpage" element={<MainPage />} />
          <Route exact path="/create-event" element={<CreateEventModal />} />
          <Route exact path="/chat/:roomId" element={<ChatRoulette />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
