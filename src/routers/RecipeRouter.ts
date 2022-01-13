import {Router} from "express";
import authMiddleware, {IGetUserAuthInfoRequest} from "../middlewares/authMiddleware";
import RecipeController from "../controllers/RecipeController";

const router = Router();
const controller = RecipeController.getClass();

router.get('/', controller.getAllRecipes);
// @ts-ignore
router.post('/', authMiddleware, controller.createNewRecipe);


router.get('/:id', controller.getRecipeById);
// @ts-ignore
router.put('/:id', authMiddleware, controller.editRecipe);
// @ts-ignore
router.delete('/:id', authMiddleware, controller.deleteRecipe);

// @ts-ignore
router.get('/myRecipes', authMiddleware, controller.getMyRecipes);

export default router;