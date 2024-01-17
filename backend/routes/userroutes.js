const express = require('express');
const {booknearestcab,shownearbycabs,registeruser,loginuser} = require('../controllers/usercontroller');
const isLoggedIn = require('../middleware/middleware')

const router = express.Router({ mergeParams: true });

router.post('/booknearestcab', booknearestcab);
router.post('/shownearbycabs',shownearbycabs);
router.post('/registeruser',registeruser);
router.post('/loginuser',loginuser);

module.exports = router;