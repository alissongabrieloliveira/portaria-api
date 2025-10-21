import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token não fornecido." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded; // { id, tipo_usuario }
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido." });
  }
}
