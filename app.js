var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();
var ip = require("ip");
const nodersa = require('node-rsa');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/decrypt", function (req, res) {
    var data = req.body.message;
    const privateKey = fs.readFileSync('./private_key.txt', 'utf8');
    console.log(data);
    const original = new nodersa(privateKey).decrypt(data, 'utf-8');
    console.log(original);
    return res.status(200).send(
        JSON.stringify({
           response:original, 
          statusCode: 200,
        })
      );
  
  });
  app.post("/encrypt", function (req, res) {
    var data = req.body.message;
    const publicKey = fs.readFileSync('./public_key.txt', 'utf8');
    const key = new nodersa(publicKey );
    const encrypted = key.encrypt( data, 'base64' );
    let buffstring = Buffer.from(encrypted, 'base64').toString('utf-8');
    console.log(encrypted);
    console.log(buffstring);
    return res.status(200).send(
        JSON.stringify({
           response:encrypted, 
          statusCode: 200,
        })
      );
  
  });
  
  app.listen(3000, () => {
    console.log("Started on PORT 3000");
  });
  