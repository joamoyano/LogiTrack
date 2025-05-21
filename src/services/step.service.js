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
  // Verificar si el flujo existe y pertenece al usuario
  const flow = await prisma.flow.findUnique({
    where: { id: flowId },
  });

  if (!flow) throw new Error("Flujo no encontrado");
  if (flow.createdById !== userId)
    throw new Error("No autorizado para modificar este flujo");

  if (!title || !type || order === undefined)
    throw new Error("Datos incompletos del paso");

  const newStep = await prisma.step.create({
    data: {
      flowId,
      title,
      content,
      type,
      order,
    },
  });

  return newStep;
};

module.exports = { createStepService };
