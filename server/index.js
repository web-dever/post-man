import https from 'https';
import fs from 'fs';
import express from 'express';
import { ipAddress } from './util';

var app = express();
var port = 3000;
var prefix = '/app-avn/vi/1.0';

//同步读取密钥和签名证书
var options = {
  key: fs.readFileSync(__dirname + '/keys/private.pem'),
  cert: fs.readFileSync(__dirname + '/keys/file.crt'),
  requestCert: false,
  rejectUnauthorized: false,
};

var httpsServer = https.createServer(options, app);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get(`${prefix}/title`, function(req, res, next) {
  res.json({
    value: '百度',
    url: 'http://www.baidu.com',
  });
});

httpsServer.listen(port, function() {
  console.log(`服务运行在：https://${ipAddress()}:${port}`);
});

/*     
openssl genrsa 1024 > ./private.pem ＃生成私钥key文件
openssl req -new -key ./private.pem -out csr.pem ＃通过私钥文件生成CSR证书签名
openssl x509 -req -days 365 -in csr.pem -signkey ./private.pem -out ./file.crt ＃通过私钥文件和CSR证书签名生成证书文件
    */
