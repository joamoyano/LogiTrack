const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createStepService = async ({
  flowId,
  userId,
  title,
  content,
  type,
  order,
}) => {
  const flow = await prisma.flow.findUnique({ where: { id: flowId } });
  if (!flow) throw new Error("Flujo no encontrado");
  if (flow.createdById !== userId) throw new Error("No autorizado");

  return await prisma.step.create({
    data: { flowId, title, content, type, order },
  });
};

const getStepsByFlowService = async (flowId, userId) => {
  const flow = await prisma.flow.findUnique({
    where: { id: flowId },
  });

  if (!flow) throw new Error("Flujo no encontrado");
  if (flow.createdById !== userId) throw new Error("No autorizado");

  return await prisma.step.findMany({
    where: { flowId },
    orderBy: { order: "asc" },
  });
};

module.exports = {
  createStepService,
  getStepsByFlowService,
};
