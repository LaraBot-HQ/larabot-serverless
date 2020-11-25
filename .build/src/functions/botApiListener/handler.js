"use strict";
exports.__esModule = true;
exports.handlerBotApiListener = void 0;
exports.handlerBotApiListener = function (event, context, callback) {
    console.log('Request arrived...');
    var body = JSON.parse(event.body);
    console.log(body);
    console.log(JSON.stringify(body, null, 2));
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(body)
    });
};
