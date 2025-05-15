const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createFlowService = async ({ userId, name, description }) => {
  if (!name) throw new Error("El nombre del flujo es obligatorio");

  const newFlow = await prisma.flow.create({
    data: {
      name,
      description,
      createdById: userId,
    },
  });

  return newFlow;
};

module.exports = { createFlowService };
