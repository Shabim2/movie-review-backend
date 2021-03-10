var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const fs = require('fs')
const accessTokenSecret = 'youraccesstokensecret';

let data = knex('users').then((data)=>{
    return data
})

router.post('/login', async function(req, res, next) {
  const username = req.body.user, password = req.body.password
  users = await data
  const user = users.find(u => { return u.username === username && u.password === password });
  if (user) {
      // Generate an access token
      console.log('here')
      const accessToken = jwt.sign({ user: user.username,  role: user.role, id: user.id }, accessTokenSecret);

      res.json({
          accessToken
      });
  } else {
      res.status(403)
      res.send('Username or password incorrect');
  }
});


module.exports = router;
