const users = [
  {
    userId: 1,
    name: "Jane Doe",
    dob: "2000-07-17",
    user_name: "anomJane",
    bio: "Creative thinker and late-night coder. Coffee lover with a passion for minimal design.",
    password: "string",
    created_at: "2025-05-06T10:15:00.000Z",
  },
  {
    userId: 2,
    name: "Tyron O.",
    dob: "2004-05-20",
    user_name: "tyroCreator",
    bio: "Aspiring full-stack dev building one project at a time. Big fan of anime and productivity hacks.",
    password: "string",
    created_at: "2025-05-06T10:16:00.000Z",
  },
  {
    userId: 3,
    name: "Catalina D.",
    dob: "2003-11-10",
    user_name: "catCurates",
    bio: "Digital curator and aesthetics enthusiast. I organize chaos into clean, clickable interfaces.",
    password: "string",
    created_at: "2025-05-06T10:17:00.000Z",
  },
];

const challenges = [
  {
    challengeId: 1,
    title: "Learn Guitar",
    description: "Practice guitar for 30 minutes daily.",
    contest: false,
    winner: false,
    timestamp: "2025-05-01T10:00:00Z",
    end_time: "2025-05-31T23:59:59Z",
    createdBy: 1, // Reference to user id
  },
  {
    challengeId: 2,
    title: "Read a Book",
    description: "Finish any book of your choice within this month.",
    contest: true,
    winner: false,
    timestamp: "2025-05-01T12:00:00Z",
    end_time: "2025-05-30T18:00:00Z",
    createdBy: 2,
  },
  {
    challengeId: 3,
    title: "DIY Churros",
    description: "Make churros from scratch and share a picture!",
    contest: true,
    winner: true,
    timestamp: "2025-04-15T09:30:00Z",
    end_time: "2025-04-20T21:00:00Z",
    createdBy: 3,
  },
];

const joinedChallenges = [
  { userId: 1, challengeId: 2 },
  { userId: 1, challengeId: 3 },
  { userId: 2, challengeId: 1 },
  { userId: 3, challengeId: 1 },
  { userId: 3, challengeId: 2 },
];

export { users, challenges, joinedChallenges };
