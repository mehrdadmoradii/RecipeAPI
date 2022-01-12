import pool from "../db/db";
import { UserGetDTO, UserCreateDTO, IUserGetDTO, IUserCreateDTO } from "../entities/User";
import { Pool } from "pg";
import bcrypt from 'bcrypt';

export interface IUserDao {
    getOneById(id: number): Promise<IUserGetDTO>;
    getOneByUsername(username: string): Promise<IUserGetDTO>;
    getAllUsers(): Promise<Array<IUserGetDTO>>;
    userExist(username: string): Promise<boolean>;
    insertNewUser(user: IUserCreateDTO): Promise<IUserGetDTO>;
    deleteUser(id: number): Promise<void>;
    checkPassword(username: string, password: string): Promise<boolean>;
}

export class UserDao implements IUserDao {

    // database client instance
    private database: Pool;

    constructor() {
        this.database = pool;
    }

    private async setUpTable(): Promise<void> {

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

    async insertNewUser(user: IUserCreateDTO): Promise<IUserGetDTO> {

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
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await this.database.query(sql, [user.name, user.username, hashedPassword]);
        } catch (e) {
            console.error(e);
        }

        return this.getOneByUsername(user.username);

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

    async getAllUsers(): Promise<Array<IUserGetDTO>> {

        const sql = `
            SELECT *
            FROM users;
        `;

        const users: Array<IUserGetDTO> = [];

        try {
            await this.database.connect();
            const result = await this.database.query(sql);
            for (let {id, name, username} of result.rows)
                users.push(new UserGetDTO(id, name, username));
            return users;
        } catch (e) {
            console.error(e);
        }

        return users;

    }

    async getOneById(id: number): Promise<IUserGetDTO> {

        const sql = `
           SELECT *
           FROM users
           WHERE id = $1;  
        `;

        let user: IUserGetDTO = null;

        try {
            await this.database.connect();
            const result = await this.database.query(sql, [id]);
            if (result.rows.length > 0) {
                const {name, username, id} = result.rows[0];
                user = new UserGetDTO(id, name, username);
            }
        } catch (e) {
            console.error(e);
        }

        return user;

    }

    async getOneByUsername(username: string): Promise<IUserGetDTO> {

        const sql = `
           SELECT *
           FROM users
           WHERE username = $1;  
        `;

        let user: IUserGetDTO = null;

        try {
            await this.database.connect();
            const result = await this.database.query(sql, [username]);
            if (result.rows.length > 0) {
                const {name, username, id} = result.rows[0];
                user = new UserGetDTO(id, name, username);
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

    async checkPassword(username: string, password: string): Promise<boolean> {

        const userExist = await this.userExist(username);
        if (!userExist) throw new Error(`User with username ${username} does not exist`);

        const sql = `
            SELECT password
            FROM users
            WHERE username = $1;
        `;

        let passwordIsCorrect = false;

        try {
            const passwordInDB = (await this.database.query(sql, [username])).rows[0].password;
            passwordIsCorrect = await bcrypt.compare(password, passwordInDB);
        } catch (e) {
            console.error(e);
        }

        return passwordIsCorrect;

    }

}

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