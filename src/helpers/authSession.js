class Middleware {
  verifyAdmin(req, res, next) {
    if (req.session && req.session.admin) return next();
    else return res.redirect('/auth/login');
  }
}

module.exports = new Middleware();
