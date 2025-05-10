import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import ChallengesPage from "./pages/Challenges";
import ChallengeInfo from "./components/ChallengeDetails";

// SHELF
function Shelf() {
  return (
    <>
    <button onClick={() => window.location.href = '/userprofile'}>profile</button>
      <h1 onClick={() => window.location.href = '/'} style={{cursor: 'pointer'}}>Mindful Motion</h1>
      </>
  );
}

function App() {
  return (
    <Router>
      <Shelf />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/challenges/:id" element={<ChallengeInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
