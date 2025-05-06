// export default function UserProfile() {
//     return <h1>User Profile Page</h1>;
//   }

import { Link } from "react-router-dom";
import { users, joinedChallenges, challenges } from "../adapters/mockData";

function UsersProfile() {
  const user = users[0];

  // Filter joined challenges for the user
  const hasJoined = joinedChallenges.filter(
    (entry) => entry.userId === user.userId
  );

  // Extract the challenge IDs that the user has joined
  const challengeIds = hasJoined.map((entry) => entry.challengeId);

  // Filter challenges based on the user's joined challenge IDs
  const userChallengeInfo = challenges.filter((challenge) =>
    challengeIds.includes(challenge.challengeId)
  );

  return (
    <>
      <h2>{user.name}</h2>
      <p>Birthday: {user.dob}</p>
      <p>Created: {user.created_at}</p>
      <Link to="/">
        <button>Go Home</button>
      </Link>
      <p>{user.bio}</p>

      <h3>Joined Challenges</h3>
      {userChallengeInfo.length > 0 ? (
        <ul>
          {userChallengeInfo.map((challenge) => (
            <li key={challenge.challengeId}>{challenge.title}</li>
          ))}
        </ul>
      ) : (
        <p>{user.name} has not joined any challenges.</p>
      )}
    </>
  );
}

export default UsersProfile;
