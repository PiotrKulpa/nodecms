const logout = (req, res, next) => {
  res.clearCookie('token', { path: '/' });
  res.end();
  // req.logout();
  // req.session.save((err) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.redirect('/');
  // });
}

module.exports = logout;