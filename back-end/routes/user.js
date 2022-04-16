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
/* GET users listing. */
router.post('/register', async function (req, res, next) {
  try {
    let { username, email, password } = req.body; 
   
    const hashed_password = md5(password.toString())
    const checkUsername = `Select username FROM users WHERE username = ?`;
    
con.connect(function(err) {
    if (err) throw err;

    con.query(checkUsername, [username], (err, result, fields) => {

      console.log("result="+ !result);

      if(err){
        res.send("Error...");
      }

      if(!result || !result.length){

        console.log("inside")
        const sql = `Insert Into users (username, email, password) VALUES ( ?, ?, ? )`
        con.query(
          sql, [username, email, hashed_password],
        (err, result, fields) =>{
            console.log("err="+err);
          if(err){
            res.send({ status: 0, data: err });
          }else{
            let token = jwt.sign({ data: result }, 'secret')
            res.send({ status: 1, data: result, token : token });
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
    function(err, result, fields){

        console.log("result="+result)
      if(err){
        res.status(500).send({ status: 0, data: err });
      }else if(result!=null&&result.length>0){
        let token = jwt.sign({ data: result }, 'secret')
        res.status(200).send({ status: 1, data: result, token: token });
      } else {
        res.status(400).send({ status: 0, data:  Error("Incorrect username/password") });
      }
     
    })
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});
module.exports = router;
