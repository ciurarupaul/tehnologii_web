import models from "../../models/index.mjs";

const getAllComments = async (req, res, next) => {
  try {
    const comments = await models.Comment.findAll({
      where: {
        taskId: req.params.tid,
      },
    });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

const getOneComment = async (req, res, next) => {
  try {
    const comment = await models.Comment.findByPk(req.params.cid);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    next(err);
  }
};

const createComment = async (req, res, next) => {
  try {
    const comment = await models.Comment.create({
      ...req.body,
      taskId: req.params.tid,
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const comment = await models.Comment.findByPk(req.params.cid);
    if (comment) {
      await comment.update(req.body);
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await models.Comment.findByPk(req.params.cid);
    if (comment) {
      await comment.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getAllComments,
  getOneComment,
  createComment,
  updateComment,
  deleteComment,
};
