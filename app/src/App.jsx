import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import ChallengesPage from "./pages/Challenges";
import ChallengeInfo from "./components/ChallengeDetails";

// SHELF
function Shelf() {
  return (
    // Hi AJ! Im not sure why but when I didn't add formatting, it wouldn't render at alll
    <nav
      // style={{
      //   backgroundColor: "#f0f0f0",
      //   padding: "10px",
      //   marginBottom: "20px",
      //   borderBottom: "1px solid #ccc",
      // }}
    >
       <h1>Mindful Motion</h1>
       {/*
      <div style={{ display: "flex", gap: "20px" }}>
        <a href="/">Home</a>
        <a href="/login">Sign Up</a>
        <a href="/profile">Profile</a>
        <a href="/challenges">Challenges</a>
      </div> */}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Shelf />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/challenge/:id" element={<ChallengeInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
