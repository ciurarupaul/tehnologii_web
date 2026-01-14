import type { Request, Response } from 'express';

import { fromNodeHeaders } from 'better-auth/node';

import { sendResponse } from '@/helpers/responseHelper';
import auth from '@/lib/auth';
import Activity from '@/models/activityModel';
import AppError from '@/utils/errors/appError';
import { catchAsync } from '@/utils/errors/catchAsync';

// Generate a random 6-character access code
function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const professorController = {
  getMyActivities: catchAsync(async (req: Request, res: Response) => {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      throw new AppError('You must be logged in to view activities', 401);
    }

    // Get professor's AppUser ID
    const AppUser = (await import('@/models/appUserModel')).default;
    const professor = await AppUser.findOne({
      where: { betterAuthId: session.user.id },
    });

    if (!professor) {
      throw new AppError('Professor account not found', 404);
    }

    const professorData = professor.toJSON();

    if (professorData.role !== 'professor' && professorData.role !== 'admin') {
      throw new AppError('Only professors can view activities', 403);
    }

    const activities = await Activity.findAll({
      where: { professorId: professorData.id },
      order: [['createdAt', 'DESC']],
    });

    const activityList = activities.map((activity) => activity.toJSON());

    return sendResponse(res, 200, activityList);
  }),

  getActivity: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Get authenticated user
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      throw new AppError('You must be logged in to view an activity', 401);
    }

    // Get professor's AppUser ID
    const AppUser = (await import('@/models/appUserModel')).default;
    const professor = await AppUser.findOne({
      where: { betterAuthId: session.user.id },
    });

    if (!professor) {
      throw new AppError('Professor account not found', 404);
    }

    const professorData = professor.toJSON();

    if (professorData.role !== 'professor' && professorData.role !== 'admin') {
      throw new AppError('Only professors can view activities', 403);
    }

    // Find the activity
    const activity = await Activity.findByPk(id);

    if (!activity) {
      throw new AppError('Activity not found', 404);
    }

    const activityData = activity.toJSON();

    // Check ownership
    if (activityData.professorId !== professorData.id) {
      throw new AppError('You can only view your own activities', 403);
    }

    return sendResponse(res, 200, activityData);
  }),

  createActivity: catchAsync(async (req: Request, res: Response) => {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      throw new AppError('You must be logged in to create an activity', 401);
    }

    // Get professor's AppUser ID
    const AppUser = (await import('@/models/appUserModel')).default;
    const professor = await AppUser.findOne({
      where: { betterAuthId: session.user.id },
    });

    if (!professor) {
      throw new AppError('Professor account not found', 404);
    }

    const professorData = professor.toJSON();

    if (professorData.role !== 'professor' && professorData.role !== 'admin') {
      throw new AppError('Only professors can create activities', 403);
    }

    const { title, description, startTime, endTime } = req.body;

    // Validate required fields
    if (!title || !description || !startTime || !endTime) {
      throw new AppError('Title, description, start time, and end time are required', 400);
    }

    // Validate time logic
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      throw new AppError('End time must be after start time', 400);
    }

    // Generate unique access code
    let accessCode = generateAccessCode();
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      const existing = await Activity.findOne({ where: { accessCode } });
      if (!existing) {
        isUnique = true;
      }
      else {
        accessCode = generateAccessCode();
        attempts++;
      }
    }

    if (!isUnique) {
      throw new AppError('Failed to generate unique access code. Please try again.', 500);
    }

    // Create activity
    const activity = await Activity.create({
      professorId: professorData.id,
      title,
      description,
      startTime: start,
      endTime: end,
      accessCode,
    });

    return sendResponse(res, 201, activity.toJSON());
  }),

  updateActivity: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Get authenticated user
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      throw new AppError('You must be logged in to update an activity', 401);
    }

    // Get professor's AppUser ID
    const AppUser = (await import('@/models/appUserModel')).default;
    const professor = await AppUser.findOne({
      where: { betterAuthId: session.user.id },
    });

    if (!professor) {
      throw new AppError('Professor account not found', 404);
    }

    const professorData = professor.toJSON();

    if (professorData.role !== 'professor' && professorData.role !== 'admin') {
      throw new AppError('Only professors can update activities', 403);
    }

    // Find the activity
    const activity = await Activity.findByPk(id);

    if (!activity) {
      throw new AppError('Activity not found', 404);
    }

    const activityData = activity.toJSON();

    // Check ownership
    if (activityData.professorId !== professorData.id) {
      throw new AppError('You can only update your own activities', 403);
    }

    const { title, description, startTime, endTime } = req.body;

    // Validate time logic if times are being updated
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);

      if (end <= start) {
        throw new AppError('End time must be after start time', 400);
      }
    }

    // Update activity
    await activity.update({
      ...(title && { title }),
      ...(description && { description }),
      ...(startTime && { startTime: new Date(startTime) }),
      ...(endTime && { endTime: new Date(endTime) }),
    });

    return sendResponse(res, 200, activity.toJSON());
  }),

  deleteActivity: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Get authenticated user
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      throw new AppError('You must be logged in to delete an activity', 401);
    }

    // Get professor's AppUser ID
    const AppUser = (await import('@/models/appUserModel')).default;
    const professor = await AppUser.findOne({
      where: { betterAuthId: session.user.id },
    });

    if (!professor) {
      throw new AppError('Professor account not found', 404);
    }

    const professorData = professor.toJSON();

    if (professorData.role !== 'professor' && professorData.role !== 'admin') {
      throw new AppError('Only professors can delete activities', 403);
    }

    // Find the activity
    const activity = await Activity.findByPk(id);

    if (!activity) {
      throw new AppError('Activity not found', 404);
    }

    const activityData = activity.toJSON();

    // Check ownership
    if (activityData.professorId !== professorData.id) {
      throw new AppError('You can only delete your own activities', 403);
    }

    // Delete activity
    await activity.destroy();

    return sendResponse(res, 204);
  }),
};

export default professorController;
