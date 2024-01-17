const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
  
    return res.status(401);
  };

  module.exports = isLoggedIn;