var express = require('express');
var router = express.Router();
const Link = require('../models/link')

router.get('/:code/view', async(req, res, next)=>{
  const code = req.params.code
  const resultado = await Link.findOne({where: {code}})
  if(!resultado)return res.sendView(404)
  res.render('view', resultado.dataValues)
})

router.get('/:code', async (req, res, next) => {
  const code = req.params.code

  const resultado = await Link.findOne({where: {code}})
  if(!resultado)return res.sendView(404)
  resultado.hits++
  await resultado.save()

  res.redirect(resultado.url)
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

 const resultado = await Link.create({
   url,
   code
 })

 res.render('view', resultado.dataValues)
})
module.exports = router;
