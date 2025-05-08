import { fetchData } from "./handleFetch";

const baseUrl = "/api";

export const allChallenges = async () => {
  try {
    return fetchData(`${baseUrl}/challenges`);
  } catch (e) {
    console.error("Error Fetching Challenges", e);
    throw new Error(e.message || "an unexpected error occurred");
  }
};

export const getChallengeId = async (id) => {
  try {
    return fetchData(`${baseUrl}/challenges/${id}`);
  } catch (e) {
    console.error("Error Fetching by Id", e);
    throw new Error(e.message || "an unexpected error occurred");
  }
};
