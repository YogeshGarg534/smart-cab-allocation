const User = require('../models/user');
const Cab = require('../models/cab');
const geolib = require('geolib');
const passport = require('passport');

exports.booknearestcab = async (req,res) => {
    const {latitude:latitude,longitude:longitude,userId:userId} = req.body;
    console.log(req.user);
    let minDis = Infinity;
    let cabID = null;
    for await (const doc of Cab.find()){
        let cabdistance = geolib.getDistance({latitude:latitude,longitude:longitude},{latitude:doc.latitude,longitude:doc.longitude});
        if(cabdistance<minDis){
            minDis=cabdistance;
            cabID=doc._id;
        }
        console.log(doc);
    }
    //return error id minDis is Infinity
    User.findByIdAndUpdate(userId, {$set: {assignedCabId:cabID}}, {new: true}).exec().then(() => {
       return Cab.findByIdAndUpdate(cabID,{$set: {isCabEmpty:false}},{new: true}).exec()
    }).then((cabdata)=>{

        res.json({
            success:true,
            message:'Suceesfully assigned nearest cab',
            data: cabdata
        })
    })
    .catch((err) => {
        res.status(400).json({
            error:'Error'
        });
    })
}   

const thresholdDis = 25000000000;
const maxcabs = 10;

exports.shownearbycabs = async (req,res) => {
    const {latitude:latitude,longitude:longitude} = req.body;
    const nearbyCabs = [];
    for await (const doc of Cab.find({})){
        console.log("doc is", doc);
        let cabdistance = geolib.getDistance({latitude:latitude,longitude:longitude},{latitude:doc.latitude,longitude:doc.longitude});
        console.log("cabdistance", cabdistance);
        if(cabdistance<=thresholdDis){
            nearbyCabs.push({
                cabId: doc._id,
                latitude: doc.latitude,
                longitude:doc.longitude
            });
        }
    }
    console.log("nearbyCabs", nearbyCabs);
    res.json({
        success:true,
        message:'Suceesfully fetched nearest cab',
        data: nearbyCabs
    })
}   

exports.registeruser = (req,res) =>{
    const newUser = new User({
        username: req.body.username,
    })
    User.register(newUser,req.body.password).then(user=>{
        passport.authenticate('userlocal')(req,res,()=>{
            res.json({
                success:true,
                message:'User successfully registered',  
            });
        })
    }).catch(err =>{
          res.status(400).json({
            error:'Error'
        });
    })
}


exports.loginuser = (req,res,next) =>{
    passport.authenticate("local", (error, user, message)=>{
        console.log("called");
        if (error){
            console.log(error);
            console.log("in error");
            res.json({message: error});
        }else if (!user){
            console.log("in no user");
            res.json({message: "No user exists..."});
        }else{
            console.log("User found and password matches...")
            req.login(user, (err)=>{
                if (err){
                    res.json({message: "Failed to login"})
                }else{
                    console.log("Logged in successfully...")
                    
                    // console.log("Logged in " + req.isAuthenticated());
                    console.log(req.user);
                    res.json({success: true, userId: req.user._id})
                }
            })
        }
    })(req,res,next);
}