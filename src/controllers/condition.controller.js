const {
  createConditionService,
  getConditionsByStepService,
} = require("../services/condition.service");

const createCondition = async (req, res) => {
  try {
    const userId = req.user.userId;
    const fromStepId = parseInt(req.params.stepId);
    const { expectedValue, toStepId } = req.body;

    const condition = await createConditionService({
      fromStepId,
      expectedValue,
      toStepId,
      userId,
    });
    res.status(201).json(condition);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getConditions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const stepId = parseInt(req.params.stepId);

    const conditions = await getConditionsByStepService(stepId, userId);
    res.json(conditions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createCondition, getConditions };
