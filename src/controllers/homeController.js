const HomeModel = require('../models/HomeModel')

exports.paginaInicial = (req, res) => {
  console.log(req.session.usuario)
  res.render('index');
};

exports.trataPost = (req, res) => {
  const title = req.body.title
  const descricao = req.body.descricao
  HomeModel.create({
    titulo: title,
    descricao: descricao
  }).then(dados => console.log(dados)).then(res.render('index'))
    .catch(e => console.log(e))
};
