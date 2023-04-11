const Friends = require("../models/friends");

exports.sendReq = async (req, res) => {
    try {
        let { email, freq } = req.body;
        // const myfrds = await Friends.findOne({ email: email });
        // console.log(myfrds);
        const createReq = await Friends.updateOne(
            { email: freq },
            { $push: { friendREQ: email } }
        );

        console.log(createReq);
        if (createReq) console.log("frd req successful: ", createReq);
        return res.status(200).send({ status: true, message: "frd req successful" });

    } catch (err) {
        console.log("Something went wrong", err);
        return res.status(400).send({ error: "request Failed" });
    }
};


exports.acceptReq = async (req, res) => {
    try {
        let { email, freq } = req.body;
        // const myfrds = await Friends.findOne({ email: email });
        // console.log(myfrds);
        const acceptfrd = await Friends.updateOne(
            { email: email },
            { $push: { friends: freq } }
        );

        const removeReq = await Friends.updateOne(
            { email: email },
            { $pull: { "friendREQ": freq } }
        );

        const updatefrd = await Friends.updateOne(
            { email: freq },
            { $push: { friends: email } }
        );
        // friends: { $eq : freq }
        console.log("----------------" + removeReq);

        console.log(acceptfrd);
        if (acceptfrd) console.log("frd req accepted: ", acceptfrd);
        return res.status(200).send({ status: true, message: "frd req accepted" });

    } catch (err) {
        console.log("Something went wrong", err);
        return res.status(400).send({ error: "request Failed" });
    }

};


exports.deleteFrd = async (req, res) => {
    try {
        let { email, freq } = req.body;
        // const myfrds = await Friends.findOne({ email: email });
        // console.log(myfrds);


        const removefrd = await Friends.updateOne(
            { email: email },
            { $pull: { "friends": freq } }
        );

        const updatefrd = await Friends.updateOne(
            { email: freq },
            { $pull: { "friends": email } }
        );
        // friends: { $eq : freq }
        console.log("----------------" + updatefrd);

        console.log(removefrd);
        if (removefrd) console.log("frd removed: ", removefrd);
        return res.status(200).send({ status: true, message: "frd removed" });

    } catch (err) {
        console.log("Something went wrong", err);
        return res.status(400).send({ error: "request Failed" });
    }

};


exports.getAllFriends = async (req, res) => {
    //   console.log(req.body);

    try {
        // console.log(req.body);
        const allFrds = await Friends.find({ email: req.params.email });
        
        console.log(allFrds.friends);
        if (allFrds.friends) console.log("Fetched frds successfully: ", allFrds);
        return res.status(200).send({ status: true, data: allFrds, message: "Fetced frds successfully" });

    } catch (err) {
        console.log("Something went wrong", err);
        res.status(400).send({ status: false, error: "frds fetching Failed" });
    }

};
