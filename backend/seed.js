const Cab = require('./models/cab');
const cabdata = require('./cabdata/cabdata.json')
const {automaticupdate} = require('./controllers/cabcontroller');

const seedDB = async () => {
    console.log("cabdata is ", cabdata);
    await Cab.deleteMany({}).exec().catch(err => {
        console.log(err);
    });
    await Cab.insertMany(cabdata).catch(err => {
        console.log(err);
    });
    // for await (const doc of Cab.find()){
    //     const Id = doc._id;
    //     console.log(doc);
    //     automaticupdate(Id);
    // }
}

module.exports = seedDB;