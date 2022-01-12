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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDao = void 0;
var db_1 = __importDefault(require("../db/db"));
var User_1 = require("../entities/User");
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserDao = /** @class */ (function () {
    function UserDao() {
        this.database = db_1.default;
    }
    UserDao.prototype.setUpTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n            CREATE TABLE IF NOT EXISTS users (\n                id serial PRIMARY KEY,\n                name varchar(255) NOT NULL,\n                username varchar(255) UNIQUE NOT NULL,\n                password varchar NOT NULL\n            );\n        ";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.database.connect()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.database.query(sql)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserDao.prototype.insertNewUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userExist, sql, hashedPassword, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setUpTable()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userExist(user.username)];
                    case 2:
                        userExist = _a.sent();
                        if (userExist)
                            throw new Error("User with username: ".concat(user.username, " already exist! "));
                        sql = "\n            INSERT INTO users\n                (name, username, password)\n            VALUES\n                ($1, $2, $3);\n        ";
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        return [4 /*yield*/, this.database.connect()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(user.password, 10)];
                    case 5:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.database.query(sql, [user.name, user.username, hashedPassword])];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, this.getOneByUsername(user.username)];
                }
            });
        });
    };
    UserDao.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n            DELETE\n            FROM users\n            WHERE id = $1;\n        ";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.database.connect()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.database.query(sql, [id])];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserDao.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, users, result, _i, _a, _b, id, name_1, username, e_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sql = "\n            SELECT *\n            FROM users;\n        ";
                        users = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.database.connect()];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, this.database.query(sql)];
                    case 3:
                        result = _c.sent();
                        for (_i = 0, _a = result.rows; _i < _a.length; _i++) {
                            _b = _a[_i], id = _b.id, name_1 = _b.name, username = _b.username;
                            users.push(new User_1.UserGetDTO(id, name_1, username));
                        }
                        return [2 /*return*/, users];
                    case 4:
                        e_4 = _c.sent();
                        console.error(e_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, users];
                }
            });
        });
    };
    UserDao.prototype.getOneById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, user, result, _a, name_2, username, id_1, e_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = "\n           SELECT *\n           FROM users\n           WHERE id = $1;  \n        ";
                        user = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.database.connect()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.database.query(sql, [id])];
                    case 3:
                        result = _b.sent();
                        if (result.rows.length > 0) {
                            _a = result.rows[0], name_2 = _a.name, username = _a.username, id_1 = _a.id;
                            user = new User_1.UserGetDTO(id_1, name_2, username);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_5 = _b.sent();
                        console.error(e_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, user];
                }
            });
        });
    };
    UserDao.prototype.getOneByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, user, result, _a, name_3, username_1, id, e_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = "\n           SELECT *\n           FROM users\n           WHERE username = $1;  \n        ";
                        user = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.database.connect()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.database.query(sql, [username])];
                    case 3:
                        result = _b.sent();
                        if (result.rows.length > 0) {
                            _a = result.rows[0], name_3 = _a.name, username_1 = _a.username, id = _a.id;
                            user = new User_1.UserGetDTO(id, name_3, username_1);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_6 = _b.sent();
                        console.error(e_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, user];
                }
            });
        });
    };
    UserDao.prototype.userExist = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, result, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n           SELECT *\n           FROM users\n           WHERE username = $1; \n        ";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.database.connect()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.database.query(sql, [username])];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result.rows.length === 0 ? false : true];
                    case 4:
                        e_7 = _a.sent();
                        console.error(e_7);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserDao.prototype.checkPassword = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var userExist, sql, passwordIsCorrect, passwordInDB, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userExist(username)];
                    case 1:
                        userExist = _a.sent();
                        if (!userExist)
                            throw new Error("User with username ".concat(username, " does not exist"));
                        sql = "\n            SELECT password\n            FROM users\n            WHERE username = $1;\n        ";
                        passwordIsCorrect = false;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.database.query(sql, [username])];
                    case 3:
                        passwordInDB = (_a.sent()).rows[0].password;
                        return [4 /*yield*/, bcrypt_1.default.compare(password, passwordInDB)];
                    case 4:
                        passwordIsCorrect = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_8 = _a.sent();
                        console.error(e_8);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, passwordIsCorrect];
                }
            });
        });
    };
    return UserDao;
}());
exports.UserDao = UserDao;
// (async () => {
// const userService = new UserDao();
// const res = await userService.getOneByUsername("bigmatt");
// console.log(res);
// @ts-ignore
// try {
//     const newUser = new User("json", "json22", 22, "njcdnjd");
//     await userService.insertNewUser(newUser);
//     const users = await userService.getAllUsers();
//     console.log(users);
// } catch (e) {
//     if (e instanceof Error)
//         console.log(e.message);
// }
// const userService = new UserDao();
// const res = await userService.insertNewUser(
//     new UserCreateDTO("Carl", "CarlH", "ncjdnjc"));
//
// console.log(res);
// console.log(await (userService.getAllUsers()));
// const userService = new UserDao();
// await userService.deleteUser(1);
// await userService.deleteUser(2);
// await userService.deleteUser(4);
// await userService.deleteUser(5);
// await userService.insertNewUser(new UserCreateDTO("Mehrdad", "MMoradi", "ImMehrdad"));
// const isTrue = await userService.checkPassword("MMoradi", "");
// console.log(isTrue);
// })();
