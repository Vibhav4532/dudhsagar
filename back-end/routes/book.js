// import { v4 as uuidv4 } from 'uuid';
// const uuidv4 = require("uuid/v4");
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dudhsagar"
});

router.post('/getbookings', async function (req, res, next) {
  try {
    let { email, Userrole } = req.body;
    console.log("email=" + email + "  Userrole=" + Userrole)
    if (Userrole == "ADMIN") {
      const getbookingsquery = `SELECT * From Bookings`
      con.query(getbookingsquery, [], (err, result, fields) => {
        console.log("result=" + result + err);
        if (err) {
          res.status(500).send({ status: 0, data: err });
        } else {
          res.status(200).send({ status: 1, data: result });
        }
      });
    } else {
      const getbookingsquery = `SELECT * From Bookings WHERE UserEmail= ? `
      con.query(getbookingsquery, [email], (err, result, fields) => {
        console.log("result=" + result + err);
        if (err) {
          res.status(500).send({ status: 0, data: err });
        } else {
          res.status(200).send({ status: 1, data: result });
        }
      });
    }
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post('/addbooking', async function (req, res, next) {
  try {
    let { email, dateTime, seats } = req.body;
    console.log("email=" + email);
    let transactionId = uuidv4();
    const getMaxMinVehicleIds = `SELECT MAX(VehicleId) as maxV, MIN(VehicleId) as minV FROM Vehicles`

    con.query(getMaxMinVehicleIds, [], (err, result, fields) => {
      if (err) {
        console.log("err=" + err);
        res.send({ status: 0, data: err });
      } else {
        let maxx = result[0].maxV;
        let minn = result[0].minV;
        console.log("maxx = ", maxx);
        console.log("minn = ", minn);
        let currentVehicleIdForBooking = maxx;

        const getLastBookedVehicle = `SELECT VehicleId FROM LastBookedVehicle`;
        con.query(getLastBookedVehicle, [], (err, result, fields) => {
          if (err) {
            console.log("err=" + err);
            res.send({ status: 0, data: err });
          } else {
            console.log("resultssssss=" + result);
            let lastBookedVehicle = result[0].VehicleId;
            console.log("lastBookedVehicle=" + lastBookedVehicle);

            if (lastBookedVehicle == maxx) {
              currentVehicleIdForBooking = minn;
              console.log("minn currentVehicleIdForBooking=" + currentVehicleIdForBooking);

              const addbookingsquery = `Insert Into Bookings (UserEmail, TransactionId, DateTime ,Seats,VehicleId) VALUES (?,?,?,?,?)`
              con.query(addbookingsquery, [email, transactionId, dateTime, seats, currentVehicleIdForBooking], (err, result, fields) => {
                if (err) {
                  console.log("err=" + err);
                  res.send({ status: 0, data: err });
                } else {
                  const updateLastBookedVehiclequery = `update LastBookedVehicle set VehicleId = ? where dummyKey = ?)`
                  con.query(updateLastBookedVehiclequery, [currentVehicleIdForBooking, 'dummyVehicleKey'], (err, result, fields) => {
                    if (err) {
                      res.status(500).send({ status: 0, data: err });
                    }
                    else {
                      res.status(200).send({ status: 1, data: result });
                    }

                  });
                }
              });

            } else {
              const getCurrentvehicleIdForBooking = `SELECT VehicleId FROM Vehicles where VehicleId > ? order by VehicleId limit 1`
              con.query(getCurrentvehicleIdForBooking, [lastBookedVehicle], (err, result, fields) => {
                if (err) {
                  console.log("err=" + err);
                  res.send({ status: 0, data: err });
                } else {
                  currentVehicleIdForBooking = result[0].VehicleId;
                  console.log("currentVehicleIdForBooking=" + currentVehicleIdForBooking);

                  const addbookingsquery = `Insert Into Bookings (UserEmail, TransactionId, DateTime ,Seats,VehicleId) VALUES (?,?,?,?,?)`
                  con.query(addbookingsquery, [email, transactionId, dateTime, seats, currentVehicleIdForBooking], (err, result, fields) => {
                    console.log("result=" + result + err);
                    if (err) {
                      res.status(500).send({ status: 0, data: err });
                    }
                    else {

                      const updateLastBookedVehiclequery = `update LastBookedVehicle set VehicleId = ? where dummyKey = ?)`
                      con.query(updateLastBookedVehiclequery, [currentVehicleIdForBooking, 'dummyVehicleKey'], (err, result, fields) => {
                        if (err) {
                          res.status(500).send({ status: 0, data: err });
                        }
                        else {
                          res.status(200).send({ status: 1, data: result });
                        }

                      });

                    }

                  });
                }
              });
            }
          }//else result
        });

      } // else result
    });


    /*
    let maxMin = getMaxMinVehicleIdsFromDb();
    // let [ maxx, minn] = parse maxMin;
    console.log("MaxMin = ", maxMin[0].maxV);
    console.log("MaxMin = ", maxMin[0].minV);
    let maxx = maxMin[0].maxV;
    let minn = maxMin[0].minV;

    let lastBookedVehicle = getLastBookedVehicleIdFromDb();
    let currentVehicleIdForBooking = getCurrentVehicleIdForBooking(maxx, minn, lastBookedVehicle);
    console.log("email=" + email + "transationId=" + transactionId + "dateTime=" + dateTime + "seats=" + seats)
    const addbookingsquery = `Insert Into Bookings (UserEmail, TransactionId, DateTime ,Seats,VehicleId) VALUES (?,?,?,?,?)`
    con.query(addbookingsquery, [email, transactionId, dateTime, seats, vehicleId], (err, result, fields) => {
      console.log("result=" + result + err);
      if (err) {
        res.status(500).send({ status: 0, data: err });
      }
      else {
        res.status(200).send({ status: 1, data: result });
      }

    });*/
  } catch (error) {
    console.log(error = error);
    res.send({ status: 0, error: error });
  }
});

function getMaxMinVehicleIdsFromDb() {
  const getMaxMinVehicleIds = `SELECT MAX(VehicleId) as maxV, MIN(VehicleId) as minV FROM Vehicles`
  con.query(getMaxMinVehicleIds, [], (err, result, fields) => {
    if (err) {
      console.log("err=" + err);
    }
    console.log("sdsads" + result[0])
    console.log("result111=" + result[0].maxV);
    console.log("result222=" + result[0].minV);

    return result;
  }

  );
}

function getLastBookedVehicleIdFromDb() {
  const getLastBookedVehicle = `SELECT VehicleId FROM LastBookedVehicle`
  con.query(getLastBookedVehicle, [], (err, result, fields) => {
    console.log("result=" + result + err);
    return result;
  });
}

function getCurrentVehicleIdForBooking(maxx, minn, lastBookedVehicle) {

  if (lastBookedVehicle == maxx) {
    return minn;
  } else {
    const getCurrentvehicleIdForBooking = `SELECT VehicleId FROM Vehicles where VehicleId > ? order by VehicleId limit 1`
    con.query(getCurrentVehicleBooking, [lastBookedVehicle], (err, result, fields) => {
      console.log("result=" + result + err);
      return result;
    });
  }


}
module.exports = router;