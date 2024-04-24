"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("./userController");
var router = (0, express_1.Router)();
router.post('/user', userController_1.UserController.createUser);
exports.default = router;
