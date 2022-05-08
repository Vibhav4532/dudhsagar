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
    let { email, Userrole  } = req.body;
    console.log("email=" + email + "  Userrole=" + Userrole)
        if(Userrole=="ADMIN"){
          const getbookingsquery=`SELECT * From Bookings`    
          con.query(getbookingsquery, [], (err, result, fields) => {
            console.log("result="+ result + err);
            if(err){ 
              res.status(500).send({ status: 0, data: err });
            } else{
              res.status(200).send({ status: 1, data: result});
            }
          });
        } else {
          const getbookingsquery= `SELECT * From Bookings WHERE UserEmail= ? `
          con.query(getbookingsquery, [email], (err, result, fields) => {
            console.log("result="+ result + err);
            if(err){ 
              res.status(500).send({ status: 0, data: err });
            } else{
              res.status(200).send({ status: 1, data: result});
            }
          });
        }
} catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post('/addbooking', async function  (req , res , next){
  try {
    let { email,dateTime, seats } = req.body;
    console.log("email=" + email );
    let transactionId =uuidv4();
    console.log("email=" + email + "transationId=" + transactionId + "dateTime=" + dateTime + "seats=" +seats )
    const addbookingsquery=`Insert Into Bookings (UserEmail, TransactionId, DateTime ,Seats) VALUES ( ?,?,?,?)`   
    con.query(addbookingsquery, [email, transactionId, dateTime, seats], (err, result, fields) => {  
      console.log("result="+ result + err);
      if (err){ 
        res.status(500).send({ status: 0, data: err });
      } 
      else{
        res.status(200).send({ status: 1, data: result});
      }

    });
 } catch (error) {
   console.log(error=error);
  res.send({ status: 0, error: error });
 }
});
module.exports = router;