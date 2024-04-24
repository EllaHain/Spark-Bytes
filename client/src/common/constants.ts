export const API_URL: string =
  process.env.NODE_ENV === "production"
    ? "http://spark-bytes-project-team1-production-026e.up.railway.app"
    : "http://localhost:5005";
