"use strict";
exports.__esModule = true;
var appd = require('appdynamics');
appd.profile({
    controllerHostName: 'nginx-davidlopes435-v0skdmga.srv.ravcloud.com',
    controllerPort: 80,
    controllerSslEnabled: false,
    accountName: 'customer1',
    accountAccessKey: 'f09e76b9-576d-4f2d-8b00-820d177a5e17',
    applicationName: 'NodeCassandra',
    tierName: 'Backend',
    nodeName: 'node1'
});
var express = require("express");
var bodyParser = require("body-parser");
var controller_1 = require("./controller");
var app = express();
var productController = new controller_1.ProductController();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/products', function (req, res) {
    productController.getProducts().then(function (products) {
        console.log("Returned " + products.length + " products");
        res.json(products);
    });
});
app.post('/products', function (req, res) {
    productController.insertProduct(req.body).then(function (result) {
        res.json(result);
    });
});
app.listen(3000, function () {
    console.log('Server running on 3000!');
});
