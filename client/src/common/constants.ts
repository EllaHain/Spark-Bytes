export const API_URL: string =
  process.env.NODE_ENV === "production"
    ? "https://spark-bytes-project-team1-production.up.railway.app/"
    : "localhost:5005";
