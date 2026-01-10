import express from 'express';

import adminController from '@/controllers/adminController';

const adminRouter = express.Router();

adminRouter.route('/users').get(adminController.getAllUsers);
adminRouter.patch('/users/:userId/role', adminController.updateUserRole);

export default adminRouter;
