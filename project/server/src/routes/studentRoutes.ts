import express from 'express';

import studentController from '@/controllers/studentController';

const studentRouter = express.Router();

studentRouter.post('/join', studentController.joinActivity);
studentRouter.post('/feedback', studentController.submitFeedback);

export default studentRouter;
