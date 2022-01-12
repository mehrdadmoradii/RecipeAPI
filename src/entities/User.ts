export interface IUserGetDTO {
    id: number;
    name: string;
    username: string;
}

export interface IUserCreateDTO {
    name: string;
    username: string;
    password: string;
}

export class UserGetDTO implements IUserGetDTO {
    public id: number;
    public name: string;
    public username: string;

    constructor(id: number, name: string, username: string) {
        this.id = id;
        this.name = name;
        this.username = username;
    }
}

export class UserCreateDTO implements IUserCreateDTO {
    public name: string;
    public username: string;
    public password: string;

    constructor(name: string, username: string, password: string) {
        this.name = name;
        this.username = username;
        this.password = password;
    }
}