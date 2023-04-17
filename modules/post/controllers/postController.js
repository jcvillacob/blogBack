const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

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
      return res.status(404).json({ message: "Post not found" });
    }

    if (req.userData.role !== "Admin" && post.author.toString() !== req.userData.userId) {
      return res.status(403).json({ message: "You are not allowed to edit this post" });
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
      return res.status(404).json({ message: "Post not found" });
    }

    if (req.userData.role !== "Admin" && post.author.toString() !== req.userData.userId) {
      return res.status(403).json({ message: "You are not allowed to delete this post" });
    }

    await post.deleteOne();
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};
