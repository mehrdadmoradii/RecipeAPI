"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var connectionString = 'postgresql://localhost:5432/recipeapi';
exports.default = new pg_1.Pool({ connectionString: connectionString });
