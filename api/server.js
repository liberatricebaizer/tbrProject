const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { json } = require("express");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 3000;
console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connect to Database"))
  .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

const userModel = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.send("server is running");
});
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  try {
    const result = await userModel.findOne({ email: email });
    console.log(result);
    if (result) {
      res.send({ message: "Email id is already registered 👋", alert: false });
    } else {
      const data = userModel(req.body);
      const save = await data.save();
      res.send({ message: "successful Sign up 🙌✨", alert: true });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/signin", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  try {
    const result = await userModel.findOne({ email: email });
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      console.log(dataSend);
      res.send({
        message: "Login is successful 🙌✨",
        alert: true,
        data: dataSend,
      });
      localStorage.setItem("userInfo", JSON.stringify(dataSend));
      localStorage.setItem("status", "loggedIn");
    } else {
      res.send({
        message: "Email is not available, please sign up ❌",
        alert: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const schemaRent = mongoose.Schema({
  name: String,
  email: String,
  price: String,
  mobile: String,
  location: String,
  description: String,
  image: String,
});

const RentModal = mongoose.model("rent", schemaRent);

app.post("/uploadRent", async (req, res) => {
  console.log(req.body);
  const data = await RentModal(req.body);
  const dataSave = await data.save();
  console.log(dataSave);
  res.send({ message: "Upload successfully" });
});

app.get("/rent", async (req, res) => {
  const data = await RentModal.find({});
  res.send(JSON.stringify(data));
});
app.listen(PORT, () => {
  console.log("server is running at port :" + PORT);
});
