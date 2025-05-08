import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import UserProfile from './pages/UserProfile';
import ChallengesPage from './pages/Challenges';
import ChallengeInfo from './components/challengeDetails';
import NavBar from './components/navbar';

function App() {
  return (
    <Router>
      <NavBar />
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
