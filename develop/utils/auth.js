// If loggedIn has expired, have user log back in. Otherwise, let them continue on.
const auth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = auth;