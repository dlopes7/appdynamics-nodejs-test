"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var expressCassandra = require("express-cassandra");
var ProductController = /** @class */ (function () {
    function ProductController() {
        var models = expressCassandra.createClient({
            clientOptions: {
                contactPoints: ['192.168.99.100'],
                protocolOptions: { port: 9042 },
                keyspace: 'david',
                queryOptions: { consistency: expressCassandra.consistencies.one }
            },
            ormOptions: {
                defaultReplicationStrategy: {
                    "class": 'SimpleStrategy',
                    replication_factor: 1
                },
                migration: 'safe',
                createKeyspace: true
            }
        });
        models.connect(function (err) {
            if (err)
                throw err;
            var ProductModel = models.loadSchema('Product', {
                fields: {
                    name: "text",
                    price: "double"
                },
                key: ["name"]
            }, function (err, UserModel) {
                if (err) {
                    console.log(err);
                }
            });
        });
        this.models = models;
    }
    ProductController.prototype.getProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.models.instance.Product.findAsync({}, function (err, products) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        return products;
                    })];
            });
        });
    };
    ProductController.prototype.insertProduct = function (productJSON) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                productJSON.price = Number(productJSON.price);
                product = new this.models.instance.Product(productJSON);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return product.save(function (err) {
                            if (err) {
                                console.log(err);
                                return reject(err);
                            }
                            console.log('Product saved! ' + product.name + " $" + product.price);
                            return resolve(product);
                        });
                    })];
            });
        });
    };
    return ProductController;
}());
exports.ProductController = ProductController;
