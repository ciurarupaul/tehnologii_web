import type { Request, Response } from 'express';

import { fromNodeHeaders } from 'better-auth/node';

import { sendResponse } from '@/helpers/responseHelper';
import { modelResponseUser, splitName } from '@/helpers/userHelper';
import auth from '@/lib/auth';
import AppUser from '@/models/appUserModel';
import AppError from '@/utils/errors/appError';
import { catchAsync } from '@/utils/errors/catchAsync';

const userController = {
  whoami: catchAsync(async (req: Request, res: Response) => {
    //
    // get session data
    let session;
    try {
      session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
    }
    catch (err) {
      console.error(err);
      return sendResponse(res, 204, null);
    }

    // no session, the user is not logged in
    if (!session) {
      return sendResponse(res, 204, null);
    }

    //
    // handle user fetching/creation
    const betterAuthId = session.user.id;
    if (!betterAuthId) {
      throw new AppError('Invalid session payload - missing user ID', 400);
    }

    // the user logged in, see if they are already registered as an internal AppUser. if not, add a new entry that links the account to the betterAuthId
    const { first } = splitName(session.user.name);

    const [appUser, created] = await AppUser.findOrCreate({
      where: { betterAuthId },
      defaults: {
        firstName: first,
        role: 'student',
      },
    });

    const userData = appUser.toJSON();

    return sendResponse(
      res,
      created ? 201 : 200,
      modelResponseUser(userData),
    );
  }),
};

export default userController;
