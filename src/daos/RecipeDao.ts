import pool from "../db/db";
import { Pool } from "pg";
import {RecipeCreateDTO, RecipeGetDTO, IRecipeGetDTO, IRecipeCreateDTO} from "../entities/Recipe";

export interface IRecipeDao {
    createRecipe(recipe: IRecipeCreateDTO): Promise<void>;
    getAllRecipes(): Promise<Array<IRecipeGetDTO>>;
    getRecipeById(id: number): Promise<IRecipeGetDTO>;
    editRecipe(newRecipe: IRecipeGetDTO): Promise<void>;
    getRecipesByCreatorId(id: number): Promise<Array<IRecipeGetDTO>>;
    deleteRecipeById(id: number): Promise<void>;
}

export class RecipeDao implements IRecipeDao {

    // database client instance
    private database: Pool;

    constructor() {
        this.database = pool;
    }

    private async setUpTable(): Promise<void> {

        const sql = `
            CREATE TABLE IF NOT EXISTS recipes (
                id SERIAL PRIMARY KEY,
                name varchar(255) NOT NULL,
                ingredients varchar(500) NOT NULL,
                preptime integer NOT NULL,
                description varchar(1000) NOT NULL,
                creator_id integer NOT NULL,

                CONSTRAINT fk_user
                    FOREIGN KEY (creator_id)
                            REFERENCES users(id)
            );
        `;

        try {
            await this.database.connect();
            await this.database.query(sql);
        } catch (e) {
            console.log(e);
        }

    }

    async createRecipe(recipe: IRecipeCreateDTO): Promise<void> {

        const sql = `
            INSERT INTO recipes
                (name, ingredients, preptime, description, creator_id) 
            VALUES 
                ($1, $2, $3, $4, $5);
        `;

        try {
            await this.database.connect();
            await this.database.query(sql,
                [recipe.name, recipe.ingredients, recipe.preptime, recipe.description, recipe.creator_id]);
        } catch (e) {
           if (e instanceof Error)
               console.error(e.message);
        }

    }

    async getAllRecipes(): Promise<Array<IRecipeGetDTO>> {

        const sql = `
            SELECT r.id, r.name, r.ingredients, r.preptime, r.description, r.creator_id
            FROM recipes r JOIN users u ON r.creator_id = u.id;
        `

        const users: Array<IRecipeGetDTO> = [];

        try {
            await this.database.connect();
            const result = (await this.database.query(sql)).rows;
            for (let {id, name, ingredients, preptime, description, creator_id} of result)
                users.push(new RecipeGetDTO(id, name, ingredients, preptime, description, creator_id));
        } catch (e) {
            if (e instanceof Error)
                console.error(e.message);
        }

        return users;

    }

    async getRecipeById(recipeId: number): Promise<IRecipeGetDTO> {

        const sql = `
            SELECT r.id, r.name, r.ingredients, r.preptime, r.description, r.creator_id
            FROM recipes r JOIN users u ON r.creator_id = u.id
            WHERE r.id = $1;
        `;

        let recipe: IRecipeGetDTO = null;

        try {
            await this.database.connect();
            const result = (await this.database.query(sql, [recipeId])).rows;
            const {id, name, ingredients, preptime, description, creator_id} = result[0];
            recipe = new RecipeGetDTO(id, name, ingredients, preptime, description, creator_id);
        } catch (e) {
            if (e instanceof Error)
                console.error(e.message);
        }

        return recipe;
    }

    async deleteRecipeById(id: number): Promise<void> {

        const sql = `
            DELETE FROM recipes
            WHERE id=$1;
        `;

        try {
            await this.database.connect();
            await this.database.query(sql, [id]);
        } catch (e) {
            if (e instanceof Error)
                console.error(e.message);
        }

    }

    async editRecipe(newRecipe: IRecipeGetDTO): Promise<void> {

        const sql = `
            UPDATE
                recipes
            SET
                name = $2,
                ingredients = $3,
                preptime = $4,
                description = $5
            WHERE
                id = $1;
        `;

        try {
           await this.database.connect();
           this.database.query(sql,
               [newRecipe.id, newRecipe.name, newRecipe.ingredients, newRecipe.preptime, newRecipe.description]);
        } catch (e) {
            if (e instanceof Error)
                console.error(e.message);
        }

        return Promise.resolve(undefined)
    }

    async getRecipesByCreatorId(userId: number): Promise<Array<IRecipeGetDTO>> {

        const sql = `
            SELECT r.id, r.name, r.ingredients, r.preptime, r.description, r.creator_id
            FROM recipes r JOIN users u ON r.creator_id = u.id
            WHERE u.id = $1;
        `;

        const recipes: Array<IRecipeGetDTO> = [];

        try {
            await this.database.connect();
            const result = (await this.database.query(sql, [userId])).rows;
            for (let {id, name, ingredients, preptime, description, creator_id} of result)
                recipes.push(new RecipeGetDTO(id, name, ingredients, preptime, description, creator_id));
        } catch (e) {
            if (e instanceof Error)
                console.error(e.message);
        }


        return recipes;
    }

}

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
