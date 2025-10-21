import pool from "../database/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Registro de usuário
async function register({
  nome_completo,
  nome_usuario,
  cpf,
  telefone,
  senha,
  tipo_usuario,
}) {
  if (
    !nome_completo ||
    !nome_usuario ||
    !cpf ||
    !telefone ||
    !senha ||
    !tipo_usuario
  ) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  const existing = await pool.query(
    "SELECT id FROM usuarios WHERE nome_usuario = $1 OR cpf = $2",
    [nome_usuario, cpf]
  );
  if (existing.rows.length > 0)
    throw new Error("Usuário ou CPF já cadastrado.");

  const hash = await bcrypt.hash(senha, 10);
  const data_cadastro = new Date();

  await pool.query(
    `
    INSERT INTO usuarios (
      nome_completo, nome_usuario, cpf, telefone, tipo_usuario, data_cadastro, ativo, senha
    ) VALUES ($1, $2, $3, $4, $5, $6, true, $7)
  `,
    [
      nome_completo,
      nome_usuario,
      cpf,
      telefone,
      tipo_usuario,
      data_cadastro,
      hash,
    ]
  );

  return { message: "Usuário registrado com sucesso!" };
}

// Login
async function login({ nome_usuario, senha }) {
  if (!nome_usuario || !senha) throw new Error("Credenciais obrigatórias.");

  const result = await pool.query(
    "SELECT * FROM usuarios WHERE nome_usuario = $1",
    [nome_usuario]
  );
  const user = result.rows[0];

  if (!user) throw new Error("Usuário não encontrado.");
  if (!user.ativo) throw new Error("Usuário desativado.");

  const isValid = await bcrypt.compare(senha, user.senha);
  if (!isValid) throw new Error("Senha inválida.");

  // Atualiza último acesso
  await pool.query("UPDATE usuarios SET ultimo_acesso = $1 WHERE id = $2", [
    new Date(),
    user.id,
  ]);

  const token = jwt.sign(
    { id: user.id, tipo_usuario: user.tipo_usuario },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    message: "Login realizado com sucesso.",
    token,
    usuario: {
      id: user.id,
      nome_completo: user.nome_completo,
      nome_usuario: user.nome_usuario,
      tipo_usuario: user.tipo_usuario,
    },
  };
}

export default { register, login };
