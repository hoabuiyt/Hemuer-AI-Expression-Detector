const Message = require('../models/message-model');


exports.create = (req, res) => {
    // Validate request
    console.log(req.body)
    if (!req.body.time || !req.body.video_url || !req.body.username || !req.body.expression) {
        return res.status(400).send({
            message: "Request Validation Failed! Some fields are empty!"
        });
    }

    // Create a Smile
    const smile = new Smile({
        sent_time:req.body.sent_time,
        time: req.body.time,
        video_url: req.body.video_url,
        username: req.body.username,
        expression: req.body.expression,
    });

    // Save Survey in the database
    smile.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Survey."
            });
        });
    console.log("Created new smile!");
}

// Returns the recent most 25 smiles
exports.recent = (req, res) => {
    Smile.find().sort({ $natural: -1 }).limit(25)
        .then(smiles => {
            smiles = smiles.reverse();
            res.send({ smiles });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving data."
            });
        });

};


exports.saveMessage = (input) => {
    const smile = new Smile({
        time: input.time,
        video_url: input.video_url,
        username: input.username,
        expression: input.expression,
    });
    // Save Survey in the database
    smile.save()
        .then(data => {
            console.log(`Saved ${data._id} Successfully!`)
        }).catch(err => {
            console.log(err.message)
        });
}