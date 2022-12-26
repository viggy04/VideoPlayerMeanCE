const express = require('express');
const router = express.Router();

const Video = require('../models/video');

const mongoose = require('mongoose');
const { response } = require('express');
const video = require('../models/video');
const db = "mongodb+srv://viggy:Vighnesh@cluster0.vxj08d6.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

mongoose.set('strictQuery', false);

mongoose.connect(db, { useNewUrlParser: true, dbName: "viggy" }, function (err) {
    if (err) {
        console.error("Error is " + err);
    }
})

router.get('/', function (req, res) {
    res.send('Api  is working fine');
})

router.get('/videos', function (req, res) {
    // res.send('Api  is working fine');
    console.log("Get request for all videos");
    Video.find({})
        .exec(function (err, videos) {
            if (err) {
                console.log("Error retrieving videos" + err);
            }
            else {
                res.json(videos);
                // res.send(videos);
            }
        });
});

router.get('/videos/:id', function (req, res) {
    console.log("Get request for video by ID");
    Video.findById(req.params.id).exec(function (err, videos) {
        if (err) {
            console.log("Error retreving videos" + err);
        }
        else {
            res.json(videos);
        }
    });
});

router.post('/video', function (req, res) {
    console.log("Post a video");
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.desc = req.body.desc;
    newVideo.save(function (err, insertedVideo) {
        if (err) {
            console.error("Error is " + err);
        }
        else {
            res.json(insertedVideo);
        }
    });
});

router.put('/video/:id', function (req, res) {
    console.log("Update a video");
    Video.findByIdAndUpdate(req.params.id, {
        $set: { title: req.body.title, url: req.body.url, desc: req.body.desc }
    },
        {
            new: true // if this is true the method returns updated video.if false then original video is given
        },
        function (err, updatedVideo) {
            if (err) {
                console.error("Error updating video" + err);
            }
            else {
                res.json(updatedVideo);
            }
        });
})

router.delete('/video/:id', function (req, res) {
    console.log("Deleting a video");
    Video.findByIdAndRemove(req.params.id, function (err, deletedVideo) {
        if (err) {
            res.send("Deleting video" + err);
        }
        else {
            res.json(deletedVideo);
        }
    });
});

module.exports = router;


