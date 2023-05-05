const Comment = require('../models/commentModel');


///////////////////////////////////////////////////////////////////
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.query.post })
      .populate('author', 'name email role')
      .exec();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).send(err);
  }
};



///////////////////////////////////////////////////////////////////
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate('author', 'name email role')
      .exec();
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).send(err);
  }
};



///////////////////////////////////////////////////////////////////
exports.createComment = async (req, res) => {
  req.body.author = req.userData.userId;
  const newComment = new Comment(req.body);
  try {
    const comment = await newComment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).send(err);
  }
};



///////////////////////////////////////////////////////////////////
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    if (req.userData.role !== "Admin" && comment.author.toString() !== req.userData.userId) {
      return res.status(403).json({ message: "No tienes permitido editar este comentario" });
    }

    Object.assign(comment, req.body);

    // Guardar el comentario actualizado en la base de datos
    await comment.save();

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).send(err);
  }
};



///////////////////////////////////////////////////////////////////
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
    if (req.userData.role !== "Admin" && comment.author.toString() !== req.userData.userId) {
      return res.status(403).json({ message: "No tienes permitido eliminar este comentario" });
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};