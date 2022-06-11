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
    let { email, userRole, filterDateFrom, filterDateTo } = req.body;
    console.log("email=" + email + "  Userrole=" + userRole)

    whereClause = " WHERE 1=1 ";
    if (filterDateFrom && filterDateTo) {
      whereClause += " AND DateTime between '" + filterDateFrom + "' AND '" + filterDateTo + "'";
    }

    const getbookingsquery = "SELECT * From Bookings " + whereClause + "  AND UserEmail= ? order by BookingId desc";
    console.log("getbookingsquery" + getbookingsquery);
    con.query(getbookingsquery, [email], (err, result, fields) => {
      console.log("getbookingsquery result=" + result + err);
      if (err) {
        res.status(500).send({ status: 0, data: err });
      } else {
        res.status(200).send({ status: 1, data: result });
      }
    });
  } catch (error) {
    console.log("getbookings error =" + error);
    res.send({ status: 0, error: error });
  }
});


module.exports = router;