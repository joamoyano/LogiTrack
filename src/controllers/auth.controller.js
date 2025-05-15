const { register, login } = require("../services/auth.service");

const registerUser = async (req, res) => {
  try {
    const result = await register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser };
