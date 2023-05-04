const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('author', 'name email role')
      .populate('category', 'name')
      .exec();

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};


exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email role')
      .populate('category', 'name')
      .exec();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).send(err);
  }
};


//////////////////////////////////////
exports.getSelf = async (req, res) => {
  try {
    const role = req.userData.role;
    let posts;
    if(role === "Admin"){
      return await exports.getAllPosts(req, res);
    } else {
      // Encontrar los posts que corresponden al autor
      posts = await Post.find({ author: req.userData.userId })
        .populate('author', 'name email role')
        .populate('category', 'name')
        .exec();
    }

    // Devolver los posts en la respuesta
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};
/////////////////////////////////////



exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    if (req.userData.role !== "Admin" && post.author.toString() !== req.userData.userId) {
      return res.status(403).json({ message: "No tienes permitido editar este Post" });
    }

    Object.assign(post, req.body);
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    if (req.userData.role !== "Admin" && post.author.toString() !== req.userData.userId) {
      return res.status(403).json({ message: "No tienes permitido eliminar este post" });
    }

    await post.deleteOne();
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};
