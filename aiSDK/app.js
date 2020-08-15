var AipOcr = require('./src/index').ocr;
var fs = require('fs');
var http = require('http');
const { small } = require('./src/const/devScope');

//设置APPID/AK/SK（前往百度云控制台创建应用后获取相关数据）
var APP_ID = "21744785";
var API_KEY = "i5rPOUf14Fgw1tQ40wNDgwqF";
var SECRET_KEY = "8QuastosYG61cdSEwgGkepkLagPem1QA";

var client = new AipOcr(APP_ID, API_KEY, SECRET_KEY);

var image = fs.readFileSync('../images/1.jpg');

var app = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    var base64Img = new Buffer(image).toString('base64');
    client.general(base64Img,{vertexes_location:true}).then(function (result) {
        res.end(JSON.stringify(result));
    });
});

app.listen(8000, function () {
    console.log('listening on 8000');
});