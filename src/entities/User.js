"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateDTO = exports.UserGetDTO = void 0;
var UserGetDTO = /** @class */ (function () {
    function UserGetDTO(id, name, username) {
        this.id = id;
        this.name = name;
        this.username = username;
    }
    return UserGetDTO;
}());
exports.UserGetDTO = UserGetDTO;
var UserCreateDTO = /** @class */ (function () {
    function UserCreateDTO(name, username, password) {
        this.name = name;
        this.username = username;
        this.password = password;
    }
    return UserCreateDTO;
}());
exports.UserCreateDTO = UserCreateDTO;
