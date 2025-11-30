import express from 'express';

import userController from '@/controllers/userController';

const userRouter = express.Router();

userRouter.route('/:id').get(userController.whoami);

export default userRouter;
