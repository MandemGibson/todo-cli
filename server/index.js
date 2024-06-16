const express = require("express");
const app = express();

app.use(express.json())
const apiRouter = require("./routes/api.routes")

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/api/v1/", apiRouter)

const PORT = 8005;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));