import { Router } from "express"
import {
    addUser,
    deletUser,
    getAllUsers,
    getUserbyId,
    updateUser
} from "../controllers/user.controller.js";

const router = Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserbyId);
router.route('/').post(addUser);
router.route('/').put(updateUser);
router.route('/:email').delete(deletUser);

export default router;