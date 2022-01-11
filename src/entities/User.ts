export interface IUserEdit {
    name: string,
    username: string
}

export interface IUserGet extends IUserEdit {
    id: number;
}

export interface IUser extends IUserGet {
    password: string;
}

export class UserEdit implements IUserEdit {

    public name: string;
    public username: string;

    constructor(name: string, username: string) {
        this.name = name;
        this.username = username;
    }

}

export class UserGet extends UserEdit implements IUserGet {

    public id: number;

   constructor(name: string, username: string, id: number) {
       super(name, username);
       this.id = id;
   }

}

export class User extends UserGet implements IUser {

    public password: string;

    constructor(name: string, username: string, id: number, password: string) {
        super(name, username, id);
        this.password = password;
    }

    asEditDto(): UserEdit {
        return new UserEdit(this.name, this.username);
    }

    asGetDto(): UserGet {
        return new UserGet(this.name, this.username, this.id);
    }

}