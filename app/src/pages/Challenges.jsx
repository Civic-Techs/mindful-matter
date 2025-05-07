import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../adapters/handleFetch";

function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const getChallenges = async () => {
      const [data, error] = await fetchData("/mock-data.json");

      if (error) {
        console.error("error loading challenges", error);
        return;
      }
      setChallenges(data.challenges);
    };
    getChallenges();
  }, []);
  return (
    <>
      <h2>Challenges</h2>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {challenges.map((challenge) => (
          <li
            key={challenge.challengeId}
            style={{
              marginBottom: "10px",
              border: "4px solid black",
              height: "50px",
              width: "150px",
              padding: "10px",
            }}
          >
            <Link to={`/challenge/${challenge.challengeId}`}>
              {challenge.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ChallengesPage;
