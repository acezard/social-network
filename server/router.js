const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')
const User = require('./models/user')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = app => {
  app.get('/userprofile', requireAuth, (req, res, next) => {
    res.send({message: req.user.firstName})
  })
  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup)
}
