var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const fs = require('fs')
const accessTokenSecret = 'youraccesstokensecret';

let users = knex('users').then((data)=>{
    console.log(data)
    return data
})

router.post('/login', function(req, res, next) {
  const username = req.body.user, password = req.body.password
  const user = users.find(u => { return u.username === username && u.password === password });
  console.log(user, password)
  if (user) {
      // Generate an access token
      const accessToken = jwt.sign({ user: user.user,  role: user.role }, accessTokenSecret);

      res.json({
          accessToken
      });
  } else {
      res.status(403)
      res.send('Username or password incorrect');
  }
});


module.exports = router;
