const express = require('express');
const { default: knex } = require('knex');
const { get } = require('./users');
const router = express.Router();


function getComments(id){
  comments = knex('comments')
  .where({id: id})
  .then((data)=>{
    return data
  })
  return comments
}

router.get('/comments/:id', async function(req, res, next) {
  let resp = await knex('comments').where({movie:req.params.id});
  if (resp.length === null){
    console.log('no comments')
  }
  resp.sort((a,b)=>{
    return a.id - b.id
  })
  res.send(resp);
});

router.get('/rating/:id', async function(req, res, next) {
  let resp = await knex('ratings').where({movie:req.params.id});
  if (resp.length === null){
    console.log('no ratings')
  }
  resp.sort((a,b)=>{
    return a.id - b.id
  })
  res.send(resp);
});

router.post('/comment', function(req, res, next){
  knex('comments')
    .insert(req.body)
    .returning('*')
    .then(()=>{
      res.send(`item ${req.body} added to db`)
    })
    .catch(err => console.log(err));
});

router.put('/comment/:id', function(req, res, next){
  comments = getComments(req.params.id)
  comment_user = comments[0].user
  if (req.user.user === comment_user) {
    knex('comments')
      .where({ id: req.params.id })
      .update(req.body)
      .returning('*')
      .then((data)=>{
        res.send(data)
      })
      .catch(err => console.log(err));
  } else {
    res.status(401).send('unathorized')
  }
})

router.delete('/:id', function(req,res,next){
  comments = getComments(req.params.id)
  comment_user = comments[0].user
  if ((req.user.user === comment_user) || (req.user.role == 'admin')){
    knex('comments')
    .del()
    .where({id: req.params.id})
    .then((data)=>{
      res.send(data)
    })
    .catch(err => console.log(err))
  } else {
    res.status(401).send('Unauthorized')
  }  
})

router.get('/commentlikes/:id', function(req, res, next){
  likes = knex('likes').where({comment: req.params.id})
    .then((data) =>{
      return data
    })
    .catch(err => console.log(err))
  sum = []
  likes.forEach(element => {
    sum.push(element.value)
  });
  res.status(200).json({
    likes: sum.reduce((a, b) => a + b, 0)
  })
})

router.post('/likes', function(req, res, next){
  likeCheck = knex('likes').where({user: req.body.user, comment: req.body.comment})
    .then(data => {return data})
    .catch(err => console.log(err))
  if (likeCheck.length === 0){
    likes = knex('likes')
      .insert(req.body)
      .returning('*')
      .then((data)=>{
        res.status(201).send(data)
      })
      .catch(err => console.log(err))
  } else{
    res.status(403).send('Already liked')
  }
})

router.put('/like/:id', function(req, res, next){
  if (likeCheck.length === 0){
    likes = knex('likes').where({id: req.params.id})
      .insert(req.body)
      .returning('*')
      .then((data)=>{
        res.status(201).send(data)
      })
      .catch(err => console.log(err))
  } else{
    res.status(403).send('Already liked')
  }
})



module.exports = router;
