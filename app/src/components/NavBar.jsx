import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
// import HomePage from './pages/Home';
// import LoginPage from './pages/Login';
// import UserProfile from './pages/UserProfile';
// import ChallengesPage from './pages/Challenges';
// import ChallengeInfo from './components/challengeDetails';

function NavBar() {
  return (
    <nav
      style={{
        backgroundColor: '#f0f0f0',
        padding: '10px',
        marginBottom: '20px',
        borderBottom: '1px solid #ccc',
      }}
    >
      <h2>Mindful Motion</h2>
    </nav>
  );
}

export default NavBar;
