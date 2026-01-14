import type { Request, Response } from 'express';

import { sendResponse } from '@/helpers/responseHelper';
import Activity from '@/models/activityModel';
import { catchAsync } from '@/utils/errors/catchAsync';

const professorController = {
  getMyActivities: catchAsync(async (req: Request, res: Response) => {
    const { professorId } = req.params;

    const activities = await Activity.findAll({
      where: { professorId },
      order: [['createdAt', 'DESC']],
    });

    const activityList = activities.map((activity) => activity.toJSON());

    return sendResponse(res, 200, activityList);
  }),
};

export default professorController;
