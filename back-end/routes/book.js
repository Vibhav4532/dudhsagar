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

// const Razorpay = require('razorpay');
const keyId = 'rzp_test_r97NHyjpnaPOAn';
const keySecret = '70VYZ8c8yY6vF0s0g9MNQgHu';
// var razorpayInstance = new Razorpay({
//   key_id: keyId,
//   key_secret: keySecret,
// });

router.post('/getbookings', async function (req, res, next) {
  try {
    let { email, Userrole } = req.body;
    console.log("email=" + email + "  Userrole=" + Userrole)
    if (Userrole == "ADMIN") {
      const getbookingsquery = `SELECT * From Bookings order by BookingId desc`
      con.query(getbookingsquery, [], (err, result, fields) => {
        console.log("getbookingsquery admin result=" + result + err);
        if (err) {
          res.status(500).send({ status: 0, data: err });
        } else {
          res.status(200).send({ status: 1, data: result });
        }
      });
    } else {
      const getbookingsquery = `SELECT * From Bookings WHERE UserEmail= ? order by BookingId desc`
      con.query(getbookingsquery, [email], (err, result, fields) => {
        console.log("getbookingsquery result=" + result + err);
        if (err) {
          res.status(500).send({ status: 0, data: err });
        } else {
          res.status(200).send({ status: 1, data: result });
        }
      });
    }
  } catch (error) {
    console.log("getbookings error =" + error);
    res.send({ status: 0, error: error });
  }
});

router.post('/addbooking', async function (req, res, next) {
  try {
    let { email, dateTime, seats } = req.body;
    console.log("email=" + email);
    let transactionId = uuidv4();
    const getMaxMinVehicleIds = `SELECT MAX(VehicleId) as maxV, MIN(VehicleId) as minV FROM Vehicles`

    // Get the min and max vehicleId from the Db.
    con.query(getMaxMinVehicleIds, [], (err, result, fields) => {
      if (err) {
        console.log("getMaxMinVehicleIds err=" + err);
        res.send({ status: 0, data: err });
      } else {
        let maxx = result[0].maxV;
        let minn = result[0].minV;
        console.log("maxx = ", maxx);
        console.log("minn = ", minn);
        let currentVehicleIdForBooking = maxx;

        // Get the lastBookedVehicleId from the Db.
        const getLastBookedVehicle = `SELECT VehicleId FROM LastBookedVehicle`;
        con.query(getLastBookedVehicle, [], (err, result, fields) => {
          if (err) {
            console.log("getLastBookedVehicle err=" + err);
            res.send({ status: 0, data: err });
          } else {
            console.log("getLastBookedVehicle result=" + result);
            let lastBookedVehicle = result[0].VehicleId;
            console.log("lastBookedVehicle=" + lastBookedVehicle);
            // If lastBookedVehicleId == maxx, we start the round robin from minn/beginning.
            if (lastBookedVehicle == maxx) {
              currentVehicleIdForBooking = minn;
              console.log("minn currentVehicleIdForBooking=" + currentVehicleIdForBooking);
              // Insert the booking in the Db.
              const addbookingsquery = `Insert Into Bookings (UserEmail, TransactionId, DateTime ,Seats,VehicleId) VALUES (?,?,?,?,?)`
              con.query(addbookingsquery, [email, transactionId, dateTime, seats, currentVehicleIdForBooking], (err, bookingResult, fields) => {
                if (err) {
                  console.log("addbookingsquery err=" + err);
                  res.send({ status: 0, data: err });
                } else {
                  console.log("Bookings for lastBookedVehicle == maxx result=" + bookingResult);
                  console.log("Bookings for lastBookedVehicle != maxx bookingId=" + bookingResult.insertId);
                  // Update thelastBookedVehicleId in the Db.
                  const updateLastBookedVehiclequery = `update LastBookedVehicle set VehicleId = ? where dummyKey = ?`
                  con.query(updateLastBookedVehiclequery, [currentVehicleIdForBooking, 'dummyVehicleKey'], (err, updresult, fields) => {
                    if (err) {
                      console.log("updateLastBookedVehiclequery err=" + err);
                      res.status(500).send({ status: 0, data: err });
                    }
                    else {
                      console.log("updateLastBookedVehiclequery updresult=" + updresult);
                      res.status(200).send({ status: 1, data: bookingResult });
                    }

                  });
                }
              });

            } else {
              // Get the next vehicleId from the Db for the new booking.
              const getCurrentvehicleIdForBooking = `SELECT VehicleId FROM Vehicles where VehicleId > ? order by VehicleId limit 1`
              con.query(getCurrentvehicleIdForBooking, [lastBookedVehicle], (err, result, fields) => {
                if (err) {
                  console.log("getCurrentvehicleIdForBooking err=" + err);
                  res.send({ status: 0, data: err });
                } else {
                  currentVehicleIdForBooking = result[0].VehicleId;
                  console.log("currentVehicleIdForBooking=" + currentVehicleIdForBooking);
                  // Insert the new booking in the Db.
                  const addbookingsquery = `Insert Into Bookings (UserEmail, TransactionId, DateTime ,Seats,VehicleId) VALUES (?,?,?,?,?)`
                  con.query(addbookingsquery, [email, transactionId, dateTime, seats, currentVehicleIdForBooking], (err, bookingResult, fields) => {
                    console.log("addbookingsquery result=" + bookingResult + err);
                    if (err) {
                      console.log("addbookingsquery err=" + err);
                      res.status(500).send({ status: 0, data: err });
                    }
                    else {
                      console.log("Bookings for lastBookedVehicle != maxx result=" + bookingResult);
                      console.log("Bookings for lastBookedVehicle != maxx bookingId=" + bookingResult.insertId);
                      // Update the lastBookedVehicleId in the Db.
                      const updateLastBookedVehiclequery = `update LastBookedVehicle set VehicleId = ? where dummyKey = ?`
                      con.query(updateLastBookedVehiclequery, [currentVehicleIdForBooking, 'dummyVehicleKey'], (err, updresult, fields) => {
                        if (err) {
                          console.log("updateLastBookedVehiclequery err=" + err);
                          res.status(500).send({ status: 0, data: err });
                        }
                        else {
                          console.log("updateLastBookedVehiclequery updresult=" + updresult);
                          res.status(200).send({ status: 1, data: bookingResult });
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

  } catch (error) {
    console.log("addbooking error =" + error);
    res.send({ status: 0, error: error });
  }
});

// router.post('/createOrder', async function (req, res, next) {
//   try {
//     let { amount, currency, receipt } = req.body;
//     var options = {
//       amount: req.body.amount,
//       currency: req.body.currency,
//       receipt: req.body.receipt,

//     };
//     console.log("Creating Order using razorPay");

//     razorpayInstance.orders.create(options, function (err, order) {
//       console.log("Created Order using razorPay");

//       if (err) {
//         console.log("createOrder err=" + JSON.stringify(err));
//         res.send({ status: 0, data: err });
//       } else {
//         console.log("createOrder order=" + order);
//         var payload = {
//           "order": order,
//           "key": keyId
//         };
//         res.send({ status: 200, data: payload });
//       }

//     });
//     console.log("Out using razorPay");

//   } catch (error) {
//     console.log("createOrder error =" + error);
//     res.send({ status: 0, error: error });
//   }
// });

// router.post('/updatebooking', async function (req, res, next) {
//   try {
//     let orderId = req.body.paymentObject.orderId;
//     let paymentId = req.body.paymentObject.paymentId;
//     let signature = req.body.paymentObject.signature;
//     let bookingId = req.body.paymentObject.bookingId;

//     console.log("bookingId=" + bookingId);
//     const updatebookingsquery = `update Bookings set OrderId=?, PaymentId=?, Signature=? where bookingId = ?`
//     con.query(updatebookingsquery, [orderId, paymentId, signature, bookingId], (err, result, fields) => {
//       if (err) {
//         console.log("updatebookingsquery err=" + err);
//         res.send({ status: 0, data: err });
//       } else {
//         console.log("updatebookingsquery success=" + result);
//         res.status(200).send({ status: 1, data: result });
//       }
//     }
//     );

//   } catch (error) {
//     console.log("updatebooking error =" + error);
//     res.send({ status: 0, error: error });
//   }
// });

router.post('/deletebooking', async function (req, res, next) {
  try {
    let bookingId = req.body.bookingId;
    console.log("bookingId=" + bookingId);
    const deletebookingsquery = `delete from Bookings where bookingId = ?`
    con.query(deletebookingsquery, [bookingId], (err, result, fields) => {
      if (err) {
        console.log("deletebookingsquery err=" + err);
        res.send({ status: 0, data: err });
      } else {
        console.log("deletebookingsquery success=" + result);
        res.status(200).send({ status: 1, data: result });
      }
    }
    );

  } catch (error) {
    console.log("deletebooking error =" + error);
    res.send({ status: 0, error: error });
  }
});

router.post('/searchbookings', async function (req, res, next) {
  try {
    let { email, userRole, filterDateFrom, filterDateTo, filterVehicleId, filterEmail } = req.body;
    console.log("email=" + email + "  Userrole=" + userRole)

    whereClause = " WHERE 1=1 " ;
    if(filterDateFrom && filterDateTo ) {
      whereClause += " AND DateTime between '" + filterDateFrom + "' AND '"+filterDateTo +"'";
    }
    if(filterVehicleId) {
      whereClause += " AND VehicleId = "+filterVehicleId ;
    }
    if(filterEmail) {
      whereClause += " AND UserEmail = '"+filterEmail+"'" ;
    }

    //whereClause = " WHERE 1=1 " + filterDateFrom?" AND DateTime between filterDateFrom AND filterDateTo"
    if (userRole == "ADMIN") {
      const getbookingsquery = "SELECT * From Bookings "+ whereClause + " order by BookingId desc";
      console.log("getbookingsquery"+getbookingsquery);
      con.query(getbookingsquery, [], (err, result, fields) => {
        console.log("getbookingsquery admin result=" + result + err);
        if (err) {
          res.status(500).send({ status: 0, data: err });
        } else {
          res.status(200).send({ status: 1, data: result });
        }
      });
    } else {
      const getbookingsquery = "SELECT * From Bookings "+ whereClause + "  AND UserEmail= ? order by BookingId desc";
      console.log("getbookingsquery"+getbookingsquery);
      con.query(getbookingsquery, [email], (err, result, fields) => {
        console.log("getbookingsquery result=" + result + err);
        if (err) {
          res.status(500).send({ status: 0, data: err });
        } else {
          res.status(200).send({ status: 1, data: result });
        }
      });
    }
  } catch (error) {
    console.log("getbookings error =" + error);
    res.send({ status: 0, error: error });
  }
});

module.exports = router;