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

const getUserFlowsService = async (userId) => {
  const flows = await prisma.flow.findMany({
    where: { createdById: userId },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return flows;
};

module.exports = {
  createFlowService,
  getUserFlowsService,
};
