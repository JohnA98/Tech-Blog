const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/auth')
  } else {
    next()
  }
}

module.exports = withAuth
