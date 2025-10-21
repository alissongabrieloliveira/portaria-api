import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Força uma tentativa de conexão assim que o arquivo é importado
pool
  .connect()
  .then(() => console.log("Conectado ao PostgreSQL !"))
  .catch((err) => console.error("Erro ao conectar ao PostgreSQL:", err));

export default pool;
