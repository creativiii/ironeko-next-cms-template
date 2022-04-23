export const Config = {
  base:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://ironeko.com",
};
