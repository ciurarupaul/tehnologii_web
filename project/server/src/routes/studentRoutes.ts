import express from 'express';

import studentController from '@/controllers/studentController';

const studentRouter = express.Router();

studentRouter.get('/activities', studentController.getMyActivities);
studentRouter.post('/join', studentController.joinActivity);
studentRouter.post('/feedback', studentController.submitFeedback);

export default studentRouter;
