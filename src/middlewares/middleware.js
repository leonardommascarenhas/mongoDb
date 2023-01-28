exports.middleWare = (req, res, next) =>{
    if(req.body.cliente){
    console.log();
    console.log('PASSEI NO MIDDLEWARE');
    console.log();
    }
    next()
}