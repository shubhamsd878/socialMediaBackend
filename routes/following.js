// Shubham - friend and unfriend routes are working Correctly
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const followingModel = require("../models/followingModel");
const totalFollowers = require("../models/totalFollowers");

const jwt_secret = "this is vipul, shubham secret";

router.get("/totalFollowers", async (req, res) => {
  let uid = req.headers.uid;
  // ---------------- increment follower count in totalFollowers

  // fetching prevFollower, if null then intializing to 0
  let prevTotalFollowers = await totalFollowers.findById(uid).catch((err) => {
    console.error("error in fetching totalFollowers: ", err);
    return res.status(500).json({ message: "somthign went wrong", err });
  });

  if (prevTotalFollowers == null) {
    prevTotalFollowers = 0;
  } else {
    prevTotalFollowers = prevTotalFollowers.totalFollowers;
  }

  res.status(200).json({ message: true, totalFollowers: prevTotalFollowers });
});

// **********************************check if isFriend*******************************
router.get("/", async (req, res) => {
  var auth = req.headers.authtoken;

  if (!auth) {
    // console.log('no auth token')
    return res.status(400).json({ message: "Invalid User" });
  }

  const decoded = await jwt.decode(auth, jwt_secret);
  const uid = decoded.id;

  const targetUid = req.headers.targetuid;
  if (!targetUid) return res.status(400).json({ message: "no uid" });

  followingModel.find({ uid: uid }, (err, response) => {
    if (err)
      return res.status(500).json({ message: "something went wrong", err });

    if (!response[0])
      return res
        .status(201)
        .json({ message: "no, both are not friends", isFollowing: false });

    let followingArr = response[0].following;

    // console.log('followingArr: ', followingArr)
    // console.log('followingArr.includes(targetUid): ', followingArr.includes(targetUid))

    if (followingArr.includes(targetUid)) {
      return res
        .status(200)
        .json({ message: "yes, both are friends", isFollowing: true });
    }
    res
      .status(201)
      .json({ message: "no, both are not friends", isFollowing: false });
  });
});

// ************************************ route.post ************************************

router.post("/", async (req, res) => {
  var auth = req.headers.authtoken;

  // console.log(req.headers)
  if (!auth) {
    // console.log('no auth token')
    return res.status(400).json({ message: "Invalid Userno authtoken" });
  }

  const decoded = await jwt.decode(auth, jwt_secret);
  const uid = decoded.id;

  const targetUid = req.headers.targetuid;
  if (!targetUid) {
    return res.status(400).json({ message: "Invalid User, no uid" });
  }

  try {
    followingModel.updateOne(
      { uid },
      {
        $addToSet: {
          following: targetUid,
        },
      },
      { upsert: true },
      async (err, response) => {
        if (err)
          return res.status(500).json({ message: "something went wrong", err });
        else {
          // ---------------- increment follower count in totalFollowers

          // fetching prevFollower, if null then intializing to 0
          let prevTotalFollowers = await totalFollowers
            .findById(targetUid)
            .catch((errr) => {
              return res
                .status(500)
                .json({ message: "somthign went wrong", errr });
            });
          if (prevTotalFollowers == null) {
            prevTotalFollowers = 0;
          } else {
            prevTotalFollowers = prevTotalFollowers.totalFollowers;
          }

          // updating totalFollowers and returning to frontend
          totalFollowers.findByIdAndUpdate(
            targetUid,
            { totalFollowers: prevTotalFollowers + 1 },
            { upsert: true },
            (errr, resp) => {
              if (errr)
                return res
                  .status(500)
                  .json({ message: "somthign went wrong", errr });

              return res.status(200).json({
                status: 200,
                message: `now ${uid} is following ${targetUid}`,
              });
            }
          );
        }
      }
    );
  } catch (error) {
    console.log("error: ", error);
  }
});

// ************************************ route.delete ************************************
router.delete("/", (req, res) => {
  const auth = req.headers.authtoken;

  if (!auth) {
    // console.log('no auth token')
    return res.status(500).json({ message: "Invalid User, no authtoken" });
  }

  const decoded = jwt.decode(auth, jwt_secret);
  const uid = decoded.id;

  const targetUid = req.headers.targetuid;
  if (!targetUid) {
    // console.log(req.heders)
    return res.status(500).json({ message: "Invalid User, no uid" });
  }

  try {
    // followingModel.find({uid}, async(err, respon)=> {
    //     if(err) console.log('no results found')
    followingModel.updateOne(
      { uid },
      {
        // console.log(4)
        $pull: {
          following: targetUid,
        },
      },
      { upsert: true },
      async (err, response) => {
        if (err)
          return res.status(500).json({ message: "something went wrong", err });
        else {
          // ---------------- decrement follower count in totalFollowers

          // fetching prevFollower, if null then intializing to 0
          let prevTotalFollowers = await totalFollowers
            .findById(targetUid)
            .catch((errr) => {
              return res
                .status(500)
                .json({ message: "somthign went wrong", errr });
            });
          if (prevTotalFollowers == null) {
            prevTotalFollowers = 0;
          } else {
            prevTotalFollowers = prevTotalFollowers.totalFollowers;
          }

          // updating totalFollowers and returning to frontend
          totalFollowers.findByIdAndUpdate(
            targetUid,
            { totalFollowers: prevTotalFollowers - 1 },
            { upsert: true },
            (errr, resp) => {
              if (errr)
                return res
                  .status(500)
                  .json({ message: "somthign went wrong", errr });

              // console.log(`now ${uid} unfollowed ${targetUid} \n`, response)
              return res.status(200).json({
                status: 200,
                message: `now ${uid} is unfollowed ${targetUid} `,
              });
            }
          );
        }
      }
    );
    // })

    // else console.log('no data found')
  } catch (error) {
    console.log("error: ", error);
  }
});

module.exports = router;
