import * as cassandra from 'cassandra-driver';
import * as expressCassandra from "express-cassandra";



export class ProductController {

    public models: any

    constructor() {

        const models = expressCassandra.createClient({
            clientOptions: {
                contactPoints: ['192.168.99.100'],
                protocolOptions: { port: 9042 },
                keyspace: 'david',
                queryOptions: { consistency: expressCassandra.consistencies.one }
            },
            ormOptions: {
                defaultReplicationStrategy: {
                    class: 'SimpleStrategy',
                    replication_factor: 1
                },
                migration: 'safe',
                createKeyspace: true
            }
        });

        models.connect(function (err) {
            if (err) throw err;

            var ProductModel = models.loadSchema('Product', {
                fields: {
                    name: "text",
                    price: "double"
                },
                key: ["name"]
            }, function (err, UserModel) {
                if (err) {
                    console.log(err)
                }
            });
        });

        this.models = models


    }

    public async getProducts() {

        return this.models.instance.Product.findAsync({}, function (err, products) {
            if (err) {
                console.log(err);
                return;
            }
            return products
        });

    }

    public async insertProduct(productJSON) {

        productJSON.price = Number(productJSON.price);
        var product = new this.models.instance.Product(productJSON);

        return new Promise(function (resolve, reject) {

            return product.save(function (err) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                console.log('Product saved! ' + product.name + " $" + product.price);
                return resolve(product)
            });
        });

    }
}