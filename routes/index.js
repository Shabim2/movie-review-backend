const express = require('express');
const router = express.Router();


async function getRatings(){
  let ratings = await knex('ratings');
  let ratingResults =[]
  for (let i=0; i < ratings.length; i++){
    let res = {};
    let values = [];
    skip = false;
    for (let j=0; j < ratingResults.length; j++){
      if (ratingResults[j].id === ratings[i].id){
        ratingResults[j].ratings.push(ratings[i].rating)
        skip = true;
      }
    }
    if (skip == true){
      continue
    }
    res.id = ratings[i].id;
    values.push(ratings[i].rating)
    res.ratings = values
    ratingResults.push(res)
  }
  return ratingResults;
}

router.get('/', async function(req, res, next) {
  let resp = await knex('movies');
  if (resp.length === null){
    res.send(404, 'movies')
  }
  let ratings = await getRatings()
  for (let i = 0; i < resp.length; i++){
    for (let j=0; j < ratings.length; j++){
      if (resp[i].id === ratings[j].id){
        resp[i].ratings = ratings[j].ratings
        continue
      }
    }
  }
  resp.sort((a,b)=>{
    return a.id - b.id
  })
  res.send(resp);
});

router.get('/:id', async function(req, res, next) {
  let resp = await knex('movies').where({id:req.params.id});
  if (resp.length === null){
    res.send(404, 'movies')
  }
  res.send(resp);
});

router.post('/', function(req, res, next){
  console.log(req.user)
    if (req.user.role === 'admin') {
      knex('movies')
      .insert(req.body)
      .returning('*')
      .then(()=>{
        res.send(`item ${req.body.title} added to db`)
      })
      .catch(err => console.log(err));
    } else{
      res.status(401).json('unauthorized')
    }
});

router.put('/:id', function(req, res, next){
  if (req.user.role === 'admin') {
  knex('movies')
    .where({ id: req.params.id })
    .update(req.body)
    .returning('*')
    .then((data)=>{
      res.send(data)
    })
    .catch(err => console.log(err));
  } else{
    res.status(401).send('unauthorized')
  }
})

router.delete('/:id', function(req,res,next){
  if (req.user.role === 'admin') {
  knex('movies')
    .del()
    .where({id: req.params.id })
    .returning('*')
    .then((data)=>{
      res.send(data)
    })
    .catch(err => console.log(err))
  } else {
    res.status(401).send('unauthorized')
  }
})

router.get('/user', function(req, res, next){
  res.send(req.user)
})

module.exports = router;
