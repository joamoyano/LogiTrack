const {
  createFlowService,
  getUserFlowsService,
} = require("../services/flow.service");

const createFlow = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, description } = req.body;

    const flow = await createFlowService({ userId, name, description });
    res.status(201).json(flow);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserFlows = async (req, res) => {
  try {
    const userId = req.user.userId;
    const flows = await getUserFlowsService(userId);
    res.json(flows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createFlow,
  getUserFlows,
};
