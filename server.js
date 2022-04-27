const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const dbUrl = "mongodb://localhost:27017/emailtest";

const sendMail = require("./controllers/sendMail");

mongoose.set("useFindAndModify", false);
mongoose
  .connect(dbUrl, { useNewUrlParser: true })
  .then(result => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log("DB not Connected");
  });

const User = require("./models/User.model");

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Send Email"
  });
});

app.post("/sendmail", (req, res) => {
  sendMail(req, res);
});

app.get("/verify/:email/:token", (req, res) => {
  User.findOne({ email: req.params.email })
    .then(result => {
      if (result.token === req.params.token) {
        User.findOneAndUpdate(
          { _id: result._id },
          {
            $unset: { token: 1 },
            $set: {
              verified: true
            }
          }
        )
          .then(result1 => {
            console.log(result1.email);
            res.send(result1);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        res.send("Token not matched");
      }
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(PORT, console.log(`Server Running on ${PORT}`));
