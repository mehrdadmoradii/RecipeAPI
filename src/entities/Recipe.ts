export interface IRecipeCreateDTO {
    name: string,
    ingredients: string,
    preptime: string,
    description: string,
    creator_id: number
}

export interface IRecipeGetDTO extends IRecipeCreateDTO {
    id: number;
}

export class RecipeCreateDTO implements IRecipeCreateDTO{
    public name: string;
    public ingredients: string;
    public preptime: string;
    public description: string;
    public creator_id: number;

    constructor(name: string, ingredients: string, preptime: string, description: string, creator_id: number) {
        this.name = name;
        this.ingredients = ingredients;
        this.preptime = preptime;
        this.description = description;
        this.creator_id = creator_id;
    }

}

export class RecipeGetDTO extends RecipeCreateDTO implements IRecipeGetDTO {
    public id: number;
    public name: string;
    public ingredients: string;
    public preptime: string;
    public description: string;
    public creator_id: number;


    constructor(id: number, name: string, ingredients: string, preptime: string, description: string, creator_id: number) {
        super(name, ingredients, preptime, description, creator_id);
        this.id = id;
    }

}