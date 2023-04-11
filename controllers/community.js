
const Post = require("../models/post");

count=0;


exports.getPosts = async (req, res) => {

    try {
        console.log(req.params);
        const allPosts = await Post.find().skip(count).limit(3);
        count+=2;
        if(allPosts.length==0) {
        count=0;
        return res.status(200).send({ status: true, data: allPosts, message: "all posts have successfully there nothing to fetch" });
        }


        if (allPosts) console.log("Fetched Posts successfully: ", allPosts);
        return res.status(200).send({ status: true, data: allPosts, message: "Fetced Posts successfully" });

    } catch (err) {
        count=0;
        console.log("Something went wrong", err);
        res.status(400).send({ status: false, error: "Posts fetching Failed" });
    }
    
};