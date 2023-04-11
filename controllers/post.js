const Post = require("../models/post");
const User = require("../models/user");


exports.addPost = async (req, res) => {
    //   console.log(req.body);

    try {
        console.log(req.body);
        const user = await User.findOne({ email: req.body.email });
        console.log(user);

        const createPost = await new Post({
            user_id: user._id,
            ...req.body
        }).save();

        if (createPost) console.log("Post created successfully: ", createPost);
        return res.status(200).send({ status: true, message: "Post created successfully" });

    } catch (err) {
        console.log("Something went wrong", err);
        res.status(400).send({ status: false, error: "Post adding Failed" });
    }
};


exports.getAllPost = async (req, res) => {
    //   console.log(req.body);

    try {
        console.log(req.body);
        const allPosts = await Post.find({ email: req.params.email });

        if (allPosts) console.log("Fetched Posts successfully: ", allPosts);
        return res.status(200).send({ status: true, data: allPosts, message: "Fetced Posts successfully" });

    } catch (err) {
        console.log("Something went wrong", err);
        res.status(400).send({ status: false, error: "Posts fetching Failed" });
    }
    
};

exports.deletePost = async (req, res) => {
      console.log(req.params.post_id);

    try {
        // console.log(req.body);
        const post = await Post.findOne({ _id: req.params.post_id });
        console.log(post);

        if(!post) return res.status(200).send({ status: false, error: "Post doesn't EXCISTS" });
        const result= await Post.deleteOne({_id: req.params.post_id});

        if (result) console.log("Post deleted successfully: ", result);
        return res.status(200).send({ status: true, message: "Post deleted successfully" });

    } catch (err) {
        console.log("Something went wrong", err);
        res.status(400).send({ status: false, error: "Post deletion Failed" });
    }
};


