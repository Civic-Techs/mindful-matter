import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import UsersProfile from "./pages/UserProfile";
//import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UsersProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
