const { startExecutionService } = require("../services/execution.service");

const startExecution = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { flowId } = req.body;

    const result = await startExecutionService({ userId, flowId });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { startExecution };
