const express = require("express");
const app = express();
const PORT = 5000;
const axios = require("axios");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userInfo = require("./schema/user.js");
const bcrypt = require("bcrypt");
const chalk = require("chalk");

app.use(bodyParser.json())

// Conncection To The Mongodb Localhost-URL  
mongoose.connect("mongodb://localhost:27017/Coustmer")

app.get("/", (req, res) => {
  res.send("hello world")
})


// Send User Info To Database
app.post("/ragister", (req, res) => {
  let { name, email, password } = req.body

  bcrypt.hash(password, 10)
    .then(password => {
      const user = new userInfo({
        name,
        email,
        password,
        date: new Date().getTime()
      })
      user.save().then((result) => {
        res.send({ status: "Sended", data: result._id, otp: OTP })
      }).catch((err) => {
        console.log(err)
      });
    }).catch(err => {
      console.log(err)
    })
})

// Code For The Login With Check Hash Password
app.post("/login", async (req, res) => {
  let { email, password } = req.body
  await userInfo.find({ email })
    .then(async (result) => {
      await bcrypt.compare(password, result[0].password)
        .then((byresult) => {
          if (byresult) {
            res.send({ msg: "PassWord is Correct" })
          } else {
            res.send({ msg: "PassWord is Incorrect" })
          }
        }).catch((err) => {
          console.log(err)
        });
    }).catch((err) => {
      console.log(err)
    });
})


// Pushing The Element To The Database
app.post("/insterted-user", async (req, res) => {
  let { _id, updateArr } = req.body

  await userInfo.findById(_id)
    .then(async (result) => {
      let [...cparr] = result.hobby

      cparr.unshift(updateArr)

      await userInfo.updateOne({ hobby: result.hobby }, { hobby: cparr })
        .then((updateArr) => {
          res.send({ data: updateArr })
        }).catch((updateErr) => {
          console.log(updateErr)
        });
    }).catch((err) => {
      console.log(err)
    });
})

app.listen(PORT, () => {
  console.log(chalk.bgBlueBright("mongodb://localhost27017"))
})