const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const startExecutionService = async ({ userId, flowId }) => {
  const flow = await prisma.flow.findUnique({
    where: { id: flowId },
    include: { steps: true },
  });

  if (!flow) throw new Error("Flujo no encontrado");
  if (flow.createdById !== userId) throw new Error("No autorizado");

  const firstStep = flow.steps.find((s) => s.order === 1);
  if (!firstStep) throw new Error("El flujo no tiene pasos");

  const execution = await prisma.execution.create({
    data: {
      userId,
      flowId,
    },
  });

  return {
    executionId: execution.id,
    currentStep: {
      id: firstStep.id,
      title: firstStep.title,
      content: firstStep.content,
      type: firstStep.type,
      order: firstStep.order,
    },
  };
};

module.exports = { startExecutionService };
