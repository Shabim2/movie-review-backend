const express = require('express');
const router = express.Router();

async function getLikes(id){
  let likes = await knex('likes').where({comment:id});
  let likesRes = [];
  let likeArray = [];
  likes.forEach(c =>{
    likeArray.push(c.comment)
  })
  likeArray = [...new Set(likeArray)]
  likeArray.forEach(c => likesRes.push({id: c, value: 0}))
  
  for (var i=0; i < likesRes.length; i++){
    for (var j=0; j < likes.length; j++){
      if (likesRes[i].id === likes[j].comment){
        likesRes[i].value += (likes[j].value)
      }
    }
  }
  console.log(likesRes)
  if (likesRes[0]){
    return likesRes[0].value;
  }else{
    return 0
  }
  
}

async function getComments(id){
  comments = await knex('comments')
  .where({id: id})
  return comments
}

router.get('/movie/:id', async function(req, res, next) {
  let resp = await knex('movies').where({id:req.params.id});
  if (resp.length === null){
    console.log('no movie')
  }
  res.send(resp[0]);
});

router.get('/comments/:id', async function(req, res, next) {
  let resp = await knex('comments').where({movie:req.params.id});
  
  for(let i=0; i < resp.length; i++){
    resp[i].likes = await getLikes(resp[i].id)
  }
  resp.sort((a,b)=>{
    return a.id - b.id
  })
  res.send(resp);
});

router.post('/comment', function(req, res, next){
  console.log(req.body)
  knex('comments')
    .insert(req.body)
    .returning('*')
    .then(()=>{
      res.send(`item ${req.body} added to db`)
    })
    .catch(err => console.log(err));
});

router.put('/comment/:id', async function(req, res, next){
  comments = await getComments(req.params.id)
  console.log(comments)
  comment_user = comments[0].username
  if (req.user.user === comment_user) {
    knex('comments')
      .where({ id: req.params.id })
      .update({comment: req.body.comment, rating: req.body.rating})
      .returning('*')
      .then((data)=>{
        res.send(data)
      })
      .catch(err => console.log(err));
  } else {
    res.status(401).send('unathorized')
  }
})

router.delete('/:id', async function(req,res,next){
  
  comments = await getComments(req.params.id)
  console.log(comments)
  comment_user = comments[0].username
  console.log('here')
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

router.post('/likes',async function(req, res, next){
  likeCheck = await knex('likes').where({user: req.user.id, comment: req.body.comment})
    .then(data => {return data})
    .catch(err => console.log(err))
  console.log(likeCheck)
  if (likeCheck.length === 0){
    knex('likes')
      .insert(req.body)
      .returning('*')
      .then((data)=>{
        res.status(201).send(data)
      })
      .catch(err => console.log(err))
  } else{
    knex('likes')
      .where({id: likeCheck[0].id})
      .update(req.body)
      .returning('*')
      .then((data)=>{
        res.status(201).send(data)
      })
      .catch(err => console.log(err))
  }
})

module.exports = router;
