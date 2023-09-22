module.exports = {
  port: 3000,
  appEndpoint: "http://localhost:3600",
  apiEndpoint: "http://localhost:3600",
  environment: "dev",
  db_name: process.env.PGDATABASE,
  db_username: process.env.PGUSER,
  db_password: process.env.PGPASSWORD,
  db_host: process.env.PGHOST,
  db_port: process.env.PGPORT,
  db_dialect: "postgres",
};
