const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const express = require('express');
const compression = require('compression');
const session = require('cookie-session');
const cors = require('cors');
const User = require('./models/user')
const dotenv = require('dotenv');
const IndexRoutes = require('./routes/routes');
const CabRoutes = require('./routes/cabroutes');
const UserRoutes = require('./routes/userroutes');
const seedDB = require('./seed')

dotenv.config()
const app = express();
const MongodbUrl=  process.env.MONGOBDURL;
app.use(compression());
app.use(cors());
app.use(express.urlencoded({ extended: true, useNewUrlParser: true }));
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json());
app.use(
  session({
    secret: 'Project is Awesome!',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

mongoose.connect(MongodbUrl
).then(()=>{
    console.log('MongoDB connected');
     seedDB();
}).catch((err) => {
    console.log(err);
})

passport.use('local', new LocalStrategy(User.authenticate()));
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err, null);
    if (user) return done(null, user);
  });
});

app.use(IndexRoutes);
app.use('/cab',CabRoutes);
app.use('/user',UserRoutes);
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on ${process.env.PORT}`);
});

