"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var UserDao_1 = require("../daos/UserDao");
var User_1 = require("../entities/User");
var http_status_codes_1 = require("http-status-codes");
var jwt = __importStar(require("jsonwebtoken"));
var UserController = /** @class */ (function () {
    function UserController() {
        this.userDao = new UserDao_1.UserDao();
    }
    UserController.getClass = function () {
        if (UserController.userController === undefined) {
            UserController.userController = new UserController();
        }
        return UserController.userController;
    };
    UserController.prototype.signUp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.body.name || !req.body.username || !req.body.password)
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'message': 'invalid user type!' })];
                        newUser = new User_1.UserCreateDTO(req.body.name, req.body.username, req.body.password);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, UserController.userController.userDao.insertNewUser(newUser)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.CREATED).json({ 'message': 'new user created!' })];
                    case 3:
                        e_1 = _a.sent();
                        if (e_1 instanceof Error)
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'message': e_1.message })];
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.signIn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var dao, passwordIsCorrect, user, token, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.body.username || !req.body.password)
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'message': 'missing username or password' })];
                        dao = UserController.userController.userDao;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, dao.checkPassword(req.body.username, req.body.password)];
                    case 2:
                        passwordIsCorrect = _a.sent();
                        if (!passwordIsCorrect)
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'message': 'incorrect username or password' })];
                        return [4 /*yield*/, dao.getOneByUsername(req.body.username)];
                    case 3:
                        user = _a.sent();
                        token = jwt.sign({ id: user.id, username: user.username }, process.env.secret);
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json({ 'token': token })];
                    case 4:
                        e_2 = _a.sent();
                        if (e_2 instanceof Error)
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'message': e_2.message })];
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
