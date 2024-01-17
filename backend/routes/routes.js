const express = require('express');

const router = express.Router({ mergeParams: true });

// GET ROUTES

router.get('/', (req, res) => {
  res.json({
    status:'Server is running'
  });
});

router.get('/logout', (req, res) => {
    req.logout();
  });

module.exports = router;