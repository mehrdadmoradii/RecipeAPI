import { Pool } from "pg";

const connectionString = 'postgresql://localhost:5432/recipeapi';

export default new Pool({connectionString});