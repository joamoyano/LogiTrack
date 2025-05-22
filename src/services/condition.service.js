const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createConditionService = async ({
  fromStepId,
  expectedValue,
  toStepId,
  userId,
}) => {
  // Obtener el paso origen
  const fromStep = await prisma.step.findUnique({ where: { id: fromStepId } });
  if (!fromStep) throw new Error("Paso origen no encontrado");

  // Verificar que el usuario es dueño del flujo
  const flow = await prisma.flow.findUnique({ where: { id: fromStep.flowId } });
  if (!flow || flow.createdById !== userId) throw new Error("No autorizado");

  // Verificar que el paso destino exista
  const toStep = await prisma.step.findUnique({ where: { id: toStepId } });
  if (!toStep || toStep.flowId !== flow.id)
    throw new Error("Paso destino inválido");

  const newCondition = await prisma.condition.create({
    data: {
      fromStepId,
      expectedValue,
      toStepId,
    },
  });

  return newCondition;
};
const getConditionsByStepService = async (stepId, userId) => {
  const step = await prisma.step.findUnique({ where: { id: stepId } });
  if (!step) throw new Error("Paso no encontrado");

  const flow = await prisma.flow.findUnique({ where: { id: step.flowId } });
  if (!flow || flow.createdById !== userId) throw new Error("No autorizado");

  return await prisma.condition.findMany({
    where: { fromStepId: stepId },
    include: {
      toStep: {
        select: {
          id: true,
          title: true,
          order: true,
        },
      },
    },
  });
};

module.exports = {
  createConditionService,
  getConditionsByStepService,
};
