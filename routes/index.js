var express = require('express');
var router = express.Router();
const Link = require('../models/link')

router.get('/:code/view', async(req, res, next)=>{
  const code = req.params.code
  const result = await Link.findOne({where: {code}})
  if(!result)return res.sendView(404)
  res.render('view', result.dataValues)
})

router.get('/:code', async (req, res, next) => {
  const code = req.params.code

  const result = await Link.findOne({where: {code}})
  if(!result)return res.sendView(404)
  result.hits++
  await result.save()

  res.redirect(result.url)
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function geradorCodi(){
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for(let i = 0; i < 8; i++)
    text += possible.charAt(Math.random() * possible.length)
    return text
} 

router.post('/new', async (req, res, next) =>{
 const url = req.body.url;
 const code = geradorCodi()

 const result = await Link.create({
   url,
   code
 })

 res.render('view', result.dataValues)
})
module.exports = router;
