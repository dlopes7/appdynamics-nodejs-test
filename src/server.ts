
var appd = require('appdynamics');
appd.profile({
    controllerHostName: 'nginx-davidlopes435-v0skdmga.srv.ravcloud.com',
    controllerPort: 80,
    controllerSslEnabled: false,  // Set to true if controllerPort is SSL
    accountName: 'customer1',
    accountAccessKey: 'f09e76b9-576d-4f2d-8b00-820d177a5e17',
    applicationName: 'NodeCassandra',
    tierName: 'Backend',
    nodeName: 'node1'
});

import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import { ProductController } from './controller'

const app = express()
const productController = new ProductController();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/products', function (req, res) {
    productController.getProducts().then((products) => {
        console.log(`Returned ${products.length} products`);
        res.json(products);
    })

});


app.post('/products', function (req, res) {
    productController.insertProduct(req.body).then((result) => {
        res.json(result)
    });
});



app.listen(3000, function () {
    console.log('Server running on 3000!');
});