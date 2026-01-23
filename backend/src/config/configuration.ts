export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  auth: {
    secret: process.env.JWT_SECRET,
  },
  frontend: {
    url: process.env.FRONTEND_URL,
  },
  tvdb: {
    apiKey: process.env.TVDB_API_KEY,
  },
});
