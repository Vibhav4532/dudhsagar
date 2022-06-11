// import { v4 as uuidv4 } from 'uuid';
// const uuidv4 = require("uuid/v4");
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dudhsagar"
});
/* GET users listing. */
router.post('/register', async function (req, res, next) {
  try {
    let { username, email, password } = req.body;

    const hashed_password = md5(password.toString())
    const checkUserEmail = `Select UserEmail FROM users WHERE UserEmail = ?`;

    con.connect(function (err) {
      if (err) throw err;

      con.query(checkUserEmail, [email], (err, result, fields) => {

        console.log("result=" + !result);

        if (err) {
          res.send("Error...");
        }

        if (!result || !result.length) {

          console.log("inside")
          const sql = `Insert Into users (username, UserEmail, password ,userrole) VALUES ( ?,?,?,"CUSTOMER")`
          con.query(
            sql, [username, email, hashed_password],
            (err, result, fields) => {
              console.log("err=" + err);
              if (err) {
                res.send({ status: 0, data: err });
              } else {
                let token = jwt.sign({ data: result }, 'secret')
                res.send({ status: 1, data: result, token: token });
              }

            })
        }
      });
    });
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post('/login', async function (req, res, next) {
  try {
    let { username, password } = req.body;

    const hashed_password = md5(password.toString())
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`
    con.query(
      sql, [username, hashed_password],
      function (err, result, fields) {

        console.log("result=" + result)
        if (err) {
          res.status(500).send({ status: 0, data: err });
        } else if (result != null && result.length > 0) {
          let token = jwt.sign({ data: result }, 'secret')
          res.status(200).send({ status: 1, data: result, token: token });
        } else {
          res.status(400).send({ status: 0, data: Error("Incorrect username/password") });
        }

      })
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post('/driverregister', async function (req, res, next) {
  try {
    let { firstName, lastName, licenceNo, mobileNo, email, password } = req.body;
    const hashed_password = md5(password.toString())
    const checkUserEmail = `Select Email FROM Drivers WHERE Email = ?`
    con.query(checkUserEmail, [email], (err, result, fields) => {
      console.log("result=" + !result);
      if (err) {
        res.send("Error...");
      }
      // Insert a new row only if there is no existing row in the database.
      // Insert a new row only if there is no existing row for the driverEmail in the database.
      //only insert only if row not found in database
      if (!result || !result.length) {
        console.log("inside")
        const sql = `Insert Into Drivers (Firstname,Lastname, LicenceNo,MobileNo, Email,password ,userrole) VALUES ( ?,?,?,?,?,?,"DRIVER")`
        con.query(
          sql, [firstName, lastName, licenceNo, mobileNo, email, hashed_password],
          (err, result, fields) => {
            console.log("err=" + err);
            if (err) {
              res.send({ status: 0, data: err });
            } else {
              let token = jwt.sign({ data: result }, 'secret')
              res.send({ status: 1, data: result, token: token });
            }
          })
      }
    });
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post('/driverlist', async function (req, res, next) {
  try {
    let { UserRole } = req.body;
    if (UserRole == "ADMIN") {
      const driverQuery = `SELECT FirstName,LastName,LicenceNo,MobileNo,Email From Drivers `
      con.query(driverQuery, [], (err, result, fields) => {
        console.log("result=" + result + err);
        if (err) {
          console.log('error');
          res.status(500).send({ status: 0, data: err });
        } else {
          console.log('success');
          res.status(200).send({ status: 1, data: result });
        }
      });
    } else {
      res.status(500).send({ status: 0 });
    }
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post('/vehicleadd', async function (req, res, next) {
  try {
    let { vehicleNo, model, seats, licenceNo } = req.body;
    const checkVehicleNo = `Select VehicleNo FROM Vehicles WHERE VehicleNo= ?`
    con.query(checkVehicleNo, [vehicleNo], (err, result, fields) => {
      console.log("result=" + result);
      if (err) {
        res.send("Error...");
      }
      // Only insert a new row if an existing row with the vehicleNo doesn't already exist in the database
      if (!result || !result.length) {
        console.log("inside");
        console.log(vehicleNo);
        const sql = `Insert Into Vehicles (VehicleNo,Model,Seats) VALUES (?,?,?)`
        con.query(
          sql, [vehicleNo, model, seats],
          (err, result, fields) => {
            console.log("err=" + err);
            if (err) {
              res.send({ status: 0, data: err });
            } else {
              vehicleId = result.insertId;
              console.log("Vehicle ID = " + vehicleId)
              console.log("Licence No = " + licenceNo)
              const sql = `Insert Into DriverVehicle (VehicleId,LicenceNo) VALUES (?,?)`
              con.query(
                sql, [vehicleId, licenceNo],
                (err, result, fields) => {
                  console.log("err=" + err);
                  if (err) {
                    res.send({ status: 0, data: err });
                  } else {
                  }
                }
              )
            }
          })
      }
    });
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post('/vehiclelist', async function (req, res, next) {
  try {
    let { UserRole } = req.body;
    if (UserRole == "ADMIN") {
      const vehiclesQuery = `SELECT VehicleNo,Model,Seats From Vehicles `
      con.query(vehiclesQuery, [], (err, result, fields) => {
        console.log("result=" + result + err);
        if (err) {
          console.log('error');
          res.status(500).send({ status: 0, data: err });
        } else {
          console.log('success');
          res.status(200).send({ status: 1, data: result });
        }
      });
    } else {
      res.status(500).send({ status: 0 });
    }
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post('/sendResetToken', async function (req, res, next) {
  try {
    let { email } = req.body;

    const checkUserEmail = `Select UserEmail FROM users WHERE UserEmail = ?`;
    con.connect(function (err) {
      if (err) throw err;

      con.query(checkUserEmail, [email], (err, result, fields) => {

        console.log("result=" + !result);

        if (err) {
          res.send({ status: 0, error: err });
        }

        if (result && result.length) {
          var token = crypto.randomBytes(32).toString("hex")

          const sql = `update users set ResetToken = ? where UserEmail= ?`
          con.query(
            sql, [token, email],
            (err, result, fields) => {
              console.log("err=" + err);
              if (err) {
                res.send({ status: 0, data: err });
              } else {
                const link = `http://localhost:4200/password-reset/${email}/${token}`;
                sendEmail(email, "Password reset", link);

              }
            });


          console.log('success');
        } else {
          res.send({ status: 0, error: 'Email Not Found' });
        }
      });
    });
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});



const sendEmail = async (email, subject, text) => {

  const transporter = nodemailer.createTransport({
    //host: process.env.HOST,
    service: 'gmail',
    //port: 587,
    //secure: true,
    auth: {
      user: 'tourdudhsagar',
      pass: 'iiofsozlzyxguvkq',
    },
  });

  await transporter.sendMail({
    from: 'tourdudhsagar',
    to: email,
    subject: subject,
    text: text,
  });

  console.log("email sent sucessfully");

};

module.exports = router;
