var Comment = require('../models/comment')
// var _ = require('underscore')

//comment
exports.save  = function(req,res){
    var _comment = req.body.comment
    var movieId = _comment.movie
    var comment = new Comment(_comment)
    console.log('_commen' + _comment.cid)
    if (_comment.cid) {
        Comment.findById(_comment.cid,function (err, comment){
            var reply = {
                from: _comment.from,
                to: _comment.tid,
                content: _comment.content
            }
            comment.reply.push(reply)

            comment.save(function(err, comment) {
                if (err) {
                    console.log(err)
                }

                res.redirect('/movie/'+ movieId)
            })
        })
    }
    else{

        comment.save(function(err, comment){
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/' + movieId)
        })
    }
}

//list delete movie 
exports.del = function(req,res){
    var id = req.query.id

    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){console.log(err)}
            else{res.json({success: 1})}
        })
    }
}
