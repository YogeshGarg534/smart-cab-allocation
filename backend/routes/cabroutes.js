const express = require('express');
const {createcab,updatecablocation} = require('../controllers/cabcontroller') 

const router = express.Router({ mergeParams: true });

router.post('/create', createcab);
router.post('/updatelocation',updatecablocation);

module.exports = router;