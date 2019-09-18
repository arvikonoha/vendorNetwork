const config = require("config");
const express = require("express");
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

const mongoose = require("mongoose");

mongoose
  .connect(config.get("mongo-uri"), {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MONGO CONNECTED"))
  .catch(error => console.error(error));

const Profile = require("./models/Profile");

app.use("/", require("./authentication/auth"));

app.use("/user", require("./routes/api/user"));

app.use("/profile", require("./routes/api/profile"));

app.use("/services", require("./routes/api/services"));

app.use("/cart", require("./routes/api/cart"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running"));