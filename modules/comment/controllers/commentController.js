const Comment = require('../models/commentModel');

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createComment = async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const comment = await newComment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (req.userData.role !== "Admin" && comment.author.toString() !== req.userData.userId) {
      return res.status(403).json({ message: "You are not allowed to edit this comment" });
    }

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (req.userData.role !== "Admin" && comment.author.toString() !== req.userData.userId) {
      return res.status(403).json({ message: "You are not allowed to delete this post" });
    }

    await comment.remove();
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};
