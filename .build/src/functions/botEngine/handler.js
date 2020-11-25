"use strict";
exports.__esModule = true;
exports.handlerBotEngine = void 0;
exports.handlerBotEngine = function (event, context, callback) {
    console.log('Request arrived...');
    var body = JSON.parse(event.body);
    console.log(JSON.stringify(body, null, 2));
    callback(null, {
        statusCode: 200,
        body: body
    });
};
