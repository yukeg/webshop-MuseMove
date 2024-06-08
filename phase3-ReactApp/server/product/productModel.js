"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
exports.ProductModel = void 0;
var model_manager_1 = require("./model-manager"); // Assuming ModelManager is in the same directory
var ProductModel = /** @class */ (function () {
    function ProductModel(filePath) {
        this.modelManager = new model_manager_1.ModelManager(filePath);
    }
    // Asynchronously get all products or filter by category/price
    ProductModel.prototype.getProducts = function (category, minPrice, maxPrice) {
        return __awaiter(this, void 0, void 0, function () {
            var filteredProducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelManager.getAll()];
                    case 1:
                        filteredProducts = _a.sent();
                        if (category) {
                            filteredProducts = filteredProducts.filter(function (product) { return product.category === category; });
                        }
                        if (minPrice !== undefined) {
                            filteredProducts = filteredProducts.filter(function (product) { return product.price >= minPrice; });
                        }
                        if (maxPrice !== undefined) {
                            filteredProducts = filteredProducts.filter(function (product) { return product.price <= maxPrice; });
                        }
                        return [2 /*return*/, filteredProducts];
                }
            });
        });
    };
    //get products by Id
    ProductModel.prototype.getProductById = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelManager.getAll()];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, products.find(function (product) { return product.productId === productId; })];
                }
            });
        });
    };
    return ProductModel;
}());
exports.ProductModel = ProductModel;
