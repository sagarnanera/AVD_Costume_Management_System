exports.Login = async (req, res) => {
  res.status(200).json({ success: true, from: "login" });
};
exports.Register = async (req, res) => {
  res.status(200).json({ success: true, from: "register" });
};
exports.Logout = async (req, res) => {
  res.status(200).json({ success: true, from: "logout" });
};
