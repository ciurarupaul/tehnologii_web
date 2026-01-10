import type { Request, Response } from 'express';

import { sendResponse } from '@/helpers/responseHelper';
import { modelResponseUser } from '@/helpers/userHelper';
import AppUser from '@/models/appUserModel';
import AppError from '@/utils/errors/appError';
import { catchAsync } from '@/utils/errors/catchAsync';

const adminController = {
  getAllUsers: catchAsync(async (req: Request, res: Response) => {
    const users = await AppUser.findAll({
      order: [['createdAt', 'DESC']],
    });

    const userList = users.map((user) => modelResponseUser(user.toJSON()));

    return sendResponse(res, 200, userList);
  }),

  updateUserRole: catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['admin', 'professor', 'student'].includes(role)) {
      throw new AppError('Invalid role. Must be admin, professor, or student', 400);
    }

    const user = await AppUser.findByPk(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await user.update({ role });

    return sendResponse(res, 200, modelResponseUser(user.toJSON()));
  }),
};

export default adminController;
