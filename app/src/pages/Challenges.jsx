import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { allChallenges } from "../adapters/challengesFetch";

function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const getChallenges = async () => {
      const [data, error] = await allChallenges();

      // CHECKING DATA
      console.log("Challenges Data:", data);
      // CHECKING DATA

      if (error) {
        console.error("error loading challenges", error);
        return;
      }
      setChallenges(data);
    };
    getChallenges();
  }, []);
  return (
    <>
      <h2>Challenges</h2>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {challenges.map(
          (challenge) => (
            console.log(challenges.id),
            (
              <li
                key={challenge.id}
                style={{
                  marginBottom: "10px",
                  border: "4px solid black",
                  height: "50px",
                  width: "150px",
                  padding: "10px",
                }}
              >
                <Link to={`/challenges/${challenge.id}`}>
                  {challenge.title}
                </Link>
              </li>
            )
          )
        )}
      </ul>
    </>
  );
}

export default ChallengesPage;
