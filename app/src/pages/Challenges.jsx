// export default function ChallengesPage() {
//     return <h1>Challenges Page</h1>;
//   }

import { challenges } from "../adapters/mockData";

function ChallengesPage() {
  return (
    <>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.challengeId}>{challenge.title}</li>
        ))}
      </ul>
    </>
  );
}

export default ChallengesPage;