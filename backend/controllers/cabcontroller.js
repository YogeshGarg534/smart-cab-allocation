const Cab = require('../models/cab');


exports.createcab = (req,res) => {
    const{latitude,longitude }=req.body;
    console.log(latitude,longitude);
    const cabobj =  new Cab({latitude:latitude,longitude:longitude,isCabEmpty:true});
    cabobj.save().then((item) => {
        res.json({
            success:true,
            message:'Suceesfully cab added',
            data: item
        })
    }).catch((err) => {
        console.log('Error',err);
        return res.status(400).json({
            error:'Error'
        });
    })
}

const change = 0.00002;

exports.automaticupdate = async (cabId) => {
   setInterval(() => {
    Cab.findByIdAndUpdate(cabId,{$inc: {latitude:change,longitude:change}}, {new: true}).exec().catch((err)=>{
        console.log(err);
    })
   },2000);
}



exports.updatecablocation = (req,res) =>{
    const {latitude,longitude,cabId} = req.body;
    Cab.findByIdAndUpdate(cabId, {$set: {latitude,longitude}}, {new: true}).exec().then((cabdata) => {
        res.json({
            success:true,
            message:'Suceesfully updated cab location'
        })

    }).catch((err) => {
        return res.status(400).json({
            error:'Error'
        });
    })
}