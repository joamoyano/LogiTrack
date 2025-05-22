const {
  createStepService,
  getStepsByFlowService,
} = require("../services/step.service");

const createStep = async (req, res) => {
  try {
    const userId = req.user.userId;
    const flowId = parseInt(req.params.flowId);
    const { title, content, type, order } = req.body;

    const step = await createStepService({
      flowId,
      userId,
      title,
      content,
      type,
      order,
    });
    res.status(201).json(step);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getStepsByFlow = async (req, res) => {
  try {
    const userId = req.user.userId;
    const flowId = parseInt(req.params.flowId);

    const steps = await getStepsByFlowService(flowId, userId);
    res.json(steps);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createStep,
  getStepsByFlow,
};
