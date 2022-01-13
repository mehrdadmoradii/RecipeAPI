import {IRecipeDao, RecipeDao} from "../daos/RecipeDao";
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {IGetUserAuthInfoRequest} from "../middlewares/authMiddleware";
import {RecipeCreateDTO} from "../entities/Recipe";

export default class RecipeController {

    private static recipeController: RecipeController;
    private userDao: IRecipeDao;

    private constructor() {
        this.userDao = new RecipeDao();
    }

    static getClass(): RecipeController {
        if (RecipeController.recipeController === undefined) {
            RecipeController.recipeController = new RecipeController();
        }
        return RecipeController.recipeController;
    }

    async getAllRecipes(req: Request, res: Response) {
        const dao = RecipeController.recipeController.userDao;
        const recipes = await dao.getAllRecipes();
        console.log(recipes);
        res.status(StatusCodes.OK).json(recipes);
    }

    async createNewRecipe(req: IGetUserAuthInfoRequest, res: Response) {
        if (!req.body.name || !req.body.ingredients || !req.body.preptime || !req.body.description)
            return res.status(StatusCodes.BAD_REQUEST).json({'message': 'invalid recipe type!'});

        const newRecipe = new RecipeCreateDTO(req.body.name,
                                              req.body.ingredients,
                                              req.body.preptime,
                                              req.body.description,
                                              req.user.id);
        try {
            const dao = RecipeController.recipeController.userDao;
            await dao.createRecipe(newRecipe);
            return res.status(StatusCodes.CREATED).json({'message': 'new recipe has been created!'});
        } catch (e) {
            if (e instanceof Error)
                return res.status(StatusCodes.BAD_REQUEST).json(
                    {'message': e.message});
        }
    }

    async getRecipeById(req: Request, res: Response) {
        if (!req.params.id)
            return res.status(StatusCodes.BAD_REQUEST).send();
        try {
            const dao = RecipeController.recipeController.userDao;
            const recipe = await dao.getRecipeById(parseInt(req.params.id));
            res.status(StatusCodes.OK).json(recipe);
        } catch (e) {
            if (e instanceof Error)
                return res.status(StatusCodes.BAD_REQUEST).json(
                    {'message': e.message});
        }
    }

    async editRecipe(req: IGetUserAuthInfoRequest, res: Response) {
        const dao = RecipeController.recipeController.userDao;
        const paramId = req.params.id ? parseInt(req.params.id) : null;

        if (!req.params.id)
            return res.status(StatusCodes.BAD_REQUEST).send();

        if (!req.body.name || !req.body.ingredients || !req.body.preptime || !req.body.description)
            return res.status(StatusCodes.BAD_REQUEST).json({'message': 'invalid recipe type!'});

        const newRecipe = new RecipeCreateDTO(req.body.name,
            req.body.ingredients,
            req.body.preptime,
            req.body.description,
            req.user.id);

        const existingRecipe = await dao.getRecipeById(paramId);
        if (!existingRecipe) {
            try {
                await dao.createRecipe(newRecipe);
                return res.status(StatusCodes.CREATED).json({'message': 'new recipe has been created!'});
            } catch (e) {
                if (e instanceof Error)
                    return res.status(StatusCodes.BAD_REQUEST).json(
                        {'message': e.message});
            }
        }
        else {
            if (existingRecipe.creator_id != req.user.id)
                return res.status(StatusCodes.UNAUTHORIZED).json(
                    {'message': "you don't have authority to modify this resource!"});
            try {
                existingRecipe.name = newRecipe.name;
                existingRecipe.ingredients = newRecipe.ingredients;
                existingRecipe.preptime = newRecipe.preptime;
                existingRecipe.description = newRecipe.description;
               await dao.editRecipe(existingRecipe);
               return res.status(StatusCodes.OK).json({'message': 'resource has been modified!'});
            } catch (e) {
                if (e instanceof Error)
                    return res.status(StatusCodes.BAD_REQUEST).json(
                        {'message': e.message});
            }
        }
    }

    async deleteRecipe(req: IGetUserAuthInfoRequest, res: Response) {
        if (!req.params.id)
            return res.status(StatusCodes.BAD_REQUEST).send();

        const paramId = parseInt(req.params.id);
        const dao = RecipeController.recipeController.userDao;
        const existingRecipe = await dao.getRecipeById(paramId);
        if (!existingRecipe)
            return res.status(StatusCodes.BAD_REQUEST).json({'message': 'resource does not exist!'});
        else {
            if (existingRecipe.creator_id != req.user.id)
                return res.status(StatusCodes.UNAUTHORIZED).json(
                    {'message': "you don't have authority to modify this resource!"});
            try {
                await dao.deleteRecipeById(paramId);
                return res.status(StatusCodes.OK).json({'message': 'resource has been removed!'});
            } catch (e) {
                if (e instanceof Error)
                    return res.status(StatusCodes.BAD_REQUEST).json(
                        {'message': e.message});
            }
        }
    }

    async getMyRecipes(req: IGetUserAuthInfoRequest, res: Response) {
        const dao = RecipeController.recipeController.userDao;
        try {
            const userId = parseInt(req.user.id);
            const recipes = await dao.getRecipesByCreatorId(userId);
            return res.status(StatusCodes.OK).json(recipes);
        } catch (e) {
            if (e instanceof Error)
                return res.status(StatusCodes.BAD_REQUEST).json(
                    {'message': e.message});
        }
    }

}