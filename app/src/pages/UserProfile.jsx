import { Link } from "react-router-dom";

function UsersProfile() {
  // const user = users[0];
  // const hasJoined = joinedChallenges.filter(
  //   (entry) => entry.userId === user.userId
  // );
  // const challengeIds = hasJoined.map((entry) => entry.challengeId);
  // const userChallengeInfo = challenges.filter((challenge) =>
  //   challengeIds.includes(challenge.challengeId)
  // );
  // return (
  //   <>
  //     <h2>{user.name}</h2>
  //     <p>Birthday: {user.dob}</p>
  //     <p>Created: {user.created_at}</p>
  //     <Link to="/">
  //       <button>Go Home</button>
  //     </Link>
  //     <p>{user.bio}</p>
  //     <h3>Joined Challenges</h3>
  //     {userChallengeInfo.length > 0 ? (
  //       <ul>
  //         {userChallengeInfo.map((challenge) => (
  //           <li key={challenge.challengeId}>{challenge.title}</li>
  //         ))}
  //       </ul>
  //     ) : (
  //       <p>{user.name} has not joined any challenges.</p>
  //     )}
  //   </>
  // );
}

export default UsersProfile;
