import express from 'express';

import professorController from '@/controllers/professorController';

const professorRouter = express.Router();

professorRouter.get('/activities', professorController.getMyActivities);
professorRouter.get('/activities/:id', professorController.getActivity);
professorRouter.post('/activities', professorController.createActivity);
professorRouter.patch('/activities/:id', professorController.updateActivity);
professorRouter.delete('/activities/:id', professorController.deleteActivity);

export default professorRouter;
