const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());
app.get("/test", (req, res) => {
  res.json("test");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

console.log("Afs");
app.listen(4000);
