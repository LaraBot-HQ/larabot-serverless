"use strict";
exports.__esModule = true;
exports.botEngine = exports.botApiListener = void 0;
var handler_1 = require("./src/functions/botApiListener/handler");
var handler_2 = require("./src/functions/botEngine/handler");
exports.botApiListener = handler_1.handlerBotApiListener;
exports.botEngine = handler_2.handlerBotEngine;
