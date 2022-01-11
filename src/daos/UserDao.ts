import pool from "../db/db";
import { User, UserGet } from "../entities/User";
import { Pool } from "pg";

export interface IUserDao {
    getOneById(id: number): Promise<UserGet>;
    getOneByUsername(username: string): Promise<UserGet>;
    getAllUsers(): Promise<Array<UserGet>>;
    userExist(username: string): Promise<boolean>;
    insertNewUser(user: User): Promise<UserGet>;
    deleteUser(id: number): Promise<void>;
}

export class UserDao implements IUserDao {

    // database client instance
    private database: Pool;

    constructor() {
        this.database = pool;
    }

    public async setUpTable(): Promise<void> {

        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id serial PRIMARY KEY,
                name varchar(255) NOT NULL,
                username varchar(255) UNIQUE NOT NULL,
                password varchar NOT NULL
            );
        `;

        try {
            await this.database.connect();
            await this.database.query(sql);
        } catch (e) {
            console.log(e);
        }

    }

    async insertNewUser(user: User): Promise<UserGet> {

        await this.setUpTable();

        const userExist = await this.userExist(user.username);
        if (userExist) throw new Error(`User with username: ${user.username} already exist! `);

        const sql = `
            INSERT INTO users
                (name, username, password)
            VALUES
                ($1, $2, $3);
        `;

        try {
            await this.database.connect();
            await this.database.query(sql, [user.name, user.username, user.password]);
        } catch (e) {
            console.log(e);
        }

        return user.asGetDto();

    }

    async deleteUser(id: number): Promise<void> {

        const sql = `
            DELETE
            FROM users
            WHERE id = $1;
        `;

        try {
            await this.database.connect();
            await this.database.query(sql, [id]);
        } catch (e) {
            console.error(e);
        }

    }

    async getAllUsers(): Promise<Array<UserGet>> {

        const sql = `
            SELECT *
            FROM users;
        `;

        const users: Array<UserGet> = [];

        try {
            await this.database.connect();
            const result = await this.database.query(sql);
            for (let {name, username, id} of result.rows)
                users.push(new UserGet(name, username, id));
            return users;
        } catch (e) {
            console.error(e);
        }

        return users;

    }

    async getOneById(id: number): Promise<UserGet> {

        const sql = `
           SELECT *
           FROM users
           WHERE id = $1;  
        `;

        let user: UserGet = null;

        try {
            await this.database.connect();
            const result = await this.database.query(sql, [id]);
            if (result.rows.length > 0) {
                const {name, username, id} = result.rows[0];
                user = new UserGet(name, username, id);
            }
        } catch (e) {
            console.error(e);
        }

        return user;

    }

    async getOneByUsername(username: string): Promise<UserGet> {

        const sql = `
           SELECT *
           FROM users
           WHERE username = $1;  
        `;

        let user: UserGet = null;

        try {
            await this.database.connect();
            const result = await this.database.query(sql, [username]);
            if (result.rows.length > 0) {
                const {name, username, id} = result.rows[0];
                user = new UserGet(name, username, id);
            }
        } catch (e) {
            console.error(e);
        }

        return user;

    }

    async userExist(username: string): Promise<boolean> {

        const sql = `
           SELECT *
           FROM users
           WHERE username = $1; 
        `;

        try {
            await this.database.connect();
            const result = await this.database.query(sql, [username]);
            return result.rows.length === 0 ? false : true;
        } catch (e) {
            console.error(e);
        }

    }

}

// (async () => {
//     const userService = new UserDao();
//
//     const res = await userService.getOneByUsername("bigmaatt");
//
//     console.log(res);
// })();