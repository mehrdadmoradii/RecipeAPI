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
exports.RecipeDao = void 0;
var db_1 = __importDefault(require("../db/db"));
var Recipe_1 = require("../entities/Recipe");
var RecipeDao = /** @class */ (function () {
    function RecipeDao() {
        this.database = db_1.default;
    }
    RecipeDao.prototype.setUpTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n            CREATE TABLE IF NOT EXISTS recipes (\n                id SERIAL PRIMARY KEY,\n                name varchar(255) NOT NULL,\n                ingredients varchar(500) NOT NULL,\n                preptime integer NOT NULL,\n                description varchar(1000) NOT NULL,\n                creator_id integer NOT NULL,\n\n                CONSTRAINT fk_user\n                    FOREIGN KEY (creator_id)\n                            REFERENCES users(id)\n            );\n        ";
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
    RecipeDao.prototype.createRecipe = function (recipe) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n            INSERT INTO recipes\n                (name, ingredients, preptime, description, creator_id) \n            VALUES \n                ($1, $2, $3, $4, $5);\n        ";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.database.connect()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.database.query(sql, [recipe.name, recipe.ingredients, recipe.preptime, recipe.description, recipe.creator_id])];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        if (e_2 instanceof Error)
                            console.error(e_2.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RecipeDao.prototype.getAllRecipes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, users, result, _i, result_1, _a, id, name_1, ingredients, preptime, description, creator_id, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = "\n            SELECT r.id, r.name, r.ingredients, r.preptime, r.description, r.creator_id\n            FROM recipes r JOIN users u ON r.creator_id = u.id;\n        ";
                        users = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.database.connect()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.database.query(sql)];
                    case 3:
                        result = (_b.sent()).rows;
                        for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                            _a = result_1[_i], id = _a.id, name_1 = _a.name, ingredients = _a.ingredients, preptime = _a.preptime, description = _a.description, creator_id = _a.creator_id;
                            users.push(new Recipe_1.RecipeGetDTO(id, name_1, ingredients, preptime, description, creator_id));
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _b.sent();
                        if (e_3 instanceof Error)
                            console.error(e_3.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, users];
                }
            });
        });
    };
    RecipeDao.prototype.getRecipeById = function (recipeId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, recipe, result, _a, id, name_2, ingredients, preptime, description, creator_id, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = "\n            SELECT r.id, r.name, r.ingredients, r.preptime, r.description, r.creator_id\n            FROM recipes r JOIN users u ON r.creator_id = u.id\n            WHERE r.id = $1;\n        ";
                        recipe = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.database.connect()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.database.query(sql, [recipeId])];
                    case 3:
                        result = (_b.sent()).rows;
                        _a = result[0], id = _a.id, name_2 = _a.name, ingredients = _a.ingredients, preptime = _a.preptime, description = _a.description, creator_id = _a.creator_id;
                        recipe = new Recipe_1.RecipeGetDTO(id, name_2, ingredients, preptime, description, creator_id);
                        return [3 /*break*/, 5];
                    case 4:
                        e_4 = _b.sent();
                        if (e_4 instanceof Error)
                            console.error(e_4.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, recipe];
                }
            });
        });
    };
    RecipeDao.prototype.deleteRecipeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n            DELETE FROM recipes\n            WHERE id=$1;\n        ";
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
                        e_5 = _a.sent();
                        if (e_5 instanceof Error)
                            console.error(e_5.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RecipeDao.prototype.editRecipe = function (newRecipe) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n            UPDATE\n                recipes\n            SET\n                name = $2,\n                ingredients = $3,\n                preptime = $4,\n                description = $5\n            WHERE\n                id = $1;\n        ";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.database.connect()];
                    case 2:
                        _a.sent();
                        this.database.query(sql, [newRecipe.id, newRecipe.name, newRecipe.ingredients, newRecipe.preptime, newRecipe.description]);
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        if (e_6 instanceof Error)
                            console.error(e_6.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, Promise.resolve(undefined)];
                }
            });
        });
    };
    RecipeDao.prototype.getRecipesByCreatorId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, recipes, result, _i, result_2, _a, id, name_3, ingredients, preptime, description, creator_id, e_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = "\n            SELECT r.id, r.name, r.ingredients, r.preptime, r.description, r.creator_id\n            FROM recipes r JOIN users u ON r.creator_id = u.id\n            WHERE u.id = $1;\n        ";
                        recipes = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.database.connect()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.database.query(sql, [userId])];
                    case 3:
                        result = (_b.sent()).rows;
                        for (_i = 0, result_2 = result; _i < result_2.length; _i++) {
                            _a = result_2[_i], id = _a.id, name_3 = _a.name, ingredients = _a.ingredients, preptime = _a.preptime, description = _a.description, creator_id = _a.creator_id;
                            recipes.push(new Recipe_1.RecipeGetDTO(id, name_3, ingredients, preptime, description, creator_id));
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_7 = _b.sent();
                        if (e_7 instanceof Error)
                            console.error(e_7.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, recipes];
                }
            });
        });
    };
    return RecipeDao;
}());
exports.RecipeDao = RecipeDao;
// (async () => {
//     const recipeDao = new RecipeDao();
// const recipe = new RecipeCreateDTO("hello!!recipe", "hello, bar, foo, world", "20", "ncjdncjncdjncdj", 9);
// await recipeDao.createRecipe(recipe);
// const recipe = await recipeDao.getRecipeById(6);
// recipe.name = 'testing eddditt!!';
// await recipeDao.editRecipe(recipe);
// console.log(await recipeDao.getRecipeById(6));
// await recipeDao.deleteRecipeById(6);
// console.log(await recipeDao.getRecipeById(6));
// })()
