const express = require("express");
const app = express();
const mysql = require("mysql")
const cors = require("cors");
const fs = require("fs")
const pdfParse =  require("pdf-parse")

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: "password",
    database: "Purchase",
    port: "3001"
  });

  app.post("/create", (req, res) => {
    const itemnumber = req.body.itemnumber;
    const itemname = req.body.itemname;
    const UOM = req.body.UOM;
    const HSNcode = req.body.HSNcode;
    const quantity = req.body.quantity;
    const rate = req.body.rate;
    const grossvalue = req.body.grossvalue;
    const netvalue = req.body.netvalue;
    const date = req.body.date;
    const remarks = req.body.remarks;
  
    db.query(
      "INSERT INTO Purchase orders (itemnumber, itemname, UOM, HSNcode, quantity, rate, grossvalue, netvalue, date, remarks) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [itemnumber, itemname, UOM, HSNcode, quantity, rate, grossvalue, netvalue, date, remarks],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });

  app.get("/Purchase orders", (req, res) => {
    db.query("SELECT * FROM Purchase orders", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  
  app.put("/update", (req, res) => {
    const itemnumber = req.body.itemnumber;
    db.query(
      "UPDATE Purchase orders  WHERE itemnumber = ?",
      [wage, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.delete("/delete/:id", (req, res) => {
    const itemnumber = req.params.itemnumber;
    db.query("DELETE FROM Purchase orders WHERE itemnumber = ?", itemnumber, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  const fs = require('fs')
const pdfParse = require('pdf-parse')
const getPDF = async (file) => {
  let readFileSync = fs.readFileSync(file)
  try {
    let pdfExtract = await pdfParse(readFileSync)
    console.log('File content: ', pdfExtract.text)
    console.log('Total pages: ', pdfExtract.numpages)
    console.log('All content: ', pdfExtract.info)
  } catch (error) {
    throw new Error(error)
  }
}

const pdfRead = './purchase.pdf'
getPDF(pdfRead)

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
  });