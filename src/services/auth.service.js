const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async ({ email, password }) => {
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) throw new Error("El usuario ya existe");

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
    },
  });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return { token };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Credenciales inválidas");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Credenciales inválidas");

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return { token };
};

module.exports = { register, login };
