import { challenges } from "../adapters/mockData";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>MindfulMotion</h1>
      <Link to="/profile">
        <button>My Profile</button>
      </Link>

      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.challengeId}>{challenge.title}</li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
