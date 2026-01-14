import type { Request, Response } from 'express';

import { fromNodeHeaders } from 'better-auth/node';

import { sendResponse } from '@/helpers/responseHelper';
import auth from '@/lib/auth';
import Activity from '@/models/activityModel';
import Feedback from '@/models/feedbackModel';
import AppError from '@/utils/errors/appError';
import { catchAsync } from '@/utils/errors/catchAsync';

const studentController = {
  getMyActivities: catchAsync(async (req: Request, res: Response) => {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      throw new AppError('You must be logged in to view activities', 401);
    }

    // Get student's AppUser ID
    const AppUser = (await import('@/models/appUserModel')).default;
    const student = await AppUser.findOne({
      where: { betterAuthId: session.user.id },
    });

    if (!student) {
      throw new AppError('Student account not found', 404);
    }

    const studentData = student.toJSON();

    // Get activities the student is enrolled in
    const activities = await Activity.findAll({
      include: [
        {
          association: 'students',
          where: { id: studentData.id },
          attributes: [],
          through: { attributes: [] },
        },
      ],
      order: [['startTime', 'DESC']],
    });

    const activitiesData = activities.map((activity) => activity.toJSON());

    return sendResponse(res, 200, activitiesData);
  }),

  joinActivity: catchAsync(async (req: Request, res: Response) => {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      throw new AppError('You must be logged in to join an activity', 401);
    }

    const { accessCode } = req.body;

    if (!accessCode) {
      throw new AppError('Access code is required', 400);
    }

    // Find activity by access code
    const activity = await Activity.findOne({
      where: { accessCode: accessCode.toUpperCase() },
    });

    if (!activity) {
      throw new AppError('Invalid access code', 404);
    }

    const activityData = activity.toJSON();

    // Check if activity is currently active
    const now = new Date();
    const startTime = new Date(activityData.startTime);
    const endTime = new Date(activityData.endTime);

    if (now < startTime) {
      throw new AppError('This activity has not started yet', 400);
    }

    if (now > endTime) {
      throw new AppError('This activity has ended', 400);
    }

    // Get student's AppUser ID
    const AppUser = (await import('@/models/appUserModel')).default;
    const student = await AppUser.findOne({
      where: { betterAuthId: session.user.id },
    });

    if (!student) {
      throw new AppError('Student account not found', 404);
    }

    // Add student to activity (if not already enrolled)
    // @ts-expect-error - Sequelize association method
    await activity.addStudent(student);

    return sendResponse(res, 200, activityData);
  }),

  submitFeedback: catchAsync(async (req: Request, res: Response) => {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      throw new AppError('You must be logged in to submit feedback', 401);
    }

    // Get student's AppUser ID
    const AppUser = (await import('@/models/appUserModel')).default;
    const student = await AppUser.findOne({
      where: { betterAuthId: session.user.id },
    });

    if (!student) {
      throw new AppError('Student account not found', 404);
    }

    const studentData = student.toJSON();

    const { activityId, type, comment } = req.body;

    // Validate required fields
    if (!activityId || !type) {
      throw new AppError('Activity ID and feedback type are required', 400);
    }

    // Validate feedback type
    const validTypes = ['smiley', 'frowny', 'surprised', 'confused'];
    if (!validTypes.includes(type)) {
      throw new AppError('Invalid feedback type', 400);
    }

    // Check if activity exists and is active
    const activity = await Activity.findByPk(activityId);

    if (!activity) {
      throw new AppError('Activity not found', 404);
    }

    const activityData = activity.toJSON();
    const now = new Date();
    const startTime = new Date(activityData.startTime);
    const endTime = new Date(activityData.endTime);

    if (now < startTime || now > endTime) {
      throw new AppError('This activity is not currently active', 400);
    }

    // Create feedback
    const feedback = await Feedback.create({
      activityId,
      studentId: studentData.id,
      type,
      comment: comment || null,
    });

    return sendResponse(res, 201, feedback.toJSON());
  }),
};

export default studentController;
