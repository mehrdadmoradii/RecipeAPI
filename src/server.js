"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var body_parser_1 = __importDefault(require("body-parser"));
var UserRouter_1 = __importDefault(require("./routers/UserRouter"));
var app = (0, express_1.default)();
/********************************************************
 *              Set basic express settings
 ********************************************************/
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
if (process.env.NODE_ENV === 'production') {
    app.use((0, helmet_1.default)());
}
/*********************************************************
 *                  Setting up routes
 *********************************************************/
app.use('/api/user/', UserRouter_1.default);
// Error handler
app.use(function (err, req, res, next) {
    return res.status(http_status_codes_1.default.BAD_REQUEST).json({
        error: err.message
    });
});
// Not Found handler
app.use(function (req, res, next) {
    return res.status((http_status_codes_1.default.NOT_FOUND)).send();
});
exports.default = app;
