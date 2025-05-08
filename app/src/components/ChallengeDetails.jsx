import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChallengeId } from "../adapters/challengesFetch";

function ChallengeInfo() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [joinedUsers, setJoinedUsers] = useState([]);

  useEffect(() => {
    const getChallenge = async () => {
      const [data, error] = await getChallengeId(id);

      //  CHECKING
      console.log("hi", data);

      if (error) {
        console.error("error fetching challenge:", error);
        return;
      }

      const foundChallenge = data.challenges.find(
        (ch) => ch.challengeId === parseInt(id)
      );

      setChallenge(foundChallenge);

      const joined = data["joined-challenges"].filter(
        (jc) => jc.challengeId === parseInt(id)
      );

      const usersJoined = data.user.filter((user) =>
        joined.some((jc) => jc.userId === user.userId)
      );
      setJoinedUsers(usersJoined);
    };
    getChallenge();
  }, [id]);

  if (!challenge) return <p>Loading Challenge...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>{challenge.title}</h2>
      <p>
        <strong>Description:</strong> {challenge.description}
      </p>
      <p>
        <strong>Contest:</strong> {challenge.contest ? "Yes" : "No"}
      </p>
      <p>
        <strong>Winner:</strong> {challenge.winner ? "Yes" : "No"}
      </p>
      <p>
        <strong>Start:</strong> {challenge.timestamp}
      </p>
      <p>
        <strong>End:</strong> {challenge.end_time}
      </p>
      <button>Join</button>

      <h3>Participants</h3>
      {joinedUsers.length > 0 ? (
        <ul>
          {joinedUsers.map((user) => (
            <li key={user.userId}>
              <strong>{user.user_name}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>No one has joined yet.</p>
      )}

      <Link to="/challenges">
        <button style={{ marginTop: "20px" }}>← Back to Challenges</button>
      </Link>
    </div>
  );
}

export default ChallengeInfo;
