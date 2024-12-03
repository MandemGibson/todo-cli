const { Router } = require("express");
const authRouter = Router();

authRouter.post("/login", (req, res) => {
    console.log(req.body);
    
  const { username, email } = req.body;
  if (!username || !email) {
    return res
      .status(401)
      .json({ success: false, message: "username or email missing" });
  }

  return res
    .status(200)
    .json({ success: true, message: "Logged in successfully" });
});

module.exports = authRouter
