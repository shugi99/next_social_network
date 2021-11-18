const Posts = require('../models/postModel')

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body
      console.log(req.images)
      // if(images.length === 0 )
      // return res.status(400).json({msg: "Please add your photo"})

      const newPost = new Posts({
        content,
        images,
        user: req.user._id,
      })
      await newPost.save()
      res.json({ msg: 'Create Post', newPost })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getPosts: async (req, res) => {
    try {
      const posts = await Posts.find({ user: [...req.user.following, req.user._id] })
        .sort('-createdAt')
        .populate('user likes', 'avatar username fullname')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password',
          },
        })
      res.json({
        msg: 'Success!',
        result: posts.length,
        posts,
      })
    } catch (error) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body
      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          content,
          images,
        }
      ).populate('user likes', 'avatar username fullname')

      res.json({
        msg: 'Post updated',
        newPost: {
          ...post._doc,
          content,
          images,
        },
      })
    } catch (error) {
      return res.status(500).json({ msg: err.message })
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Posts.find({ _id: req.params.id, likes: req.user._id })
      if (post.length > 0) return res.status(400).json({ msg: 'You liked this post.' })

      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      )

      if (!like) return res.status(400).json({ msg: 'This post does not exist.' })

      res.json({ msg: 'Liked Post!' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  unLikePost: async (req, res) => {
    try {
      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      )

      if (!like) return res.status(400).json({ msg: 'This post does not exist.' })

      res.json({ msg: 'UnLiked Post!' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getUserPosts: async (req, res) => {
    try {
      const posts = await Posts.find({ user: req.params.id }).sort('-createdAt')
      res.json({ posts, result: posts.length })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

module.exports = postCtrl
