const logout = (req, res, next) => {
  res.clearCookie('token', { path: '/' });
  res.end();
}

module.exports = logout;