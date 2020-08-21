const info = (req,res) => {
    res.status(200).send({
    "ok":true, 
    "author": {
        "email": "mseidholz@gmail.com",
        "name": "Matt Seidholz"
    },
    "frontend": {
        "url": "tbd@heroku"
    },
    "language": "node.js",
    "sources": "tbd@github",
    "answers": {
        "1": "How did I approach the problem",
        "2": "What would I add if I had more time",
        "3": "What would I add / delete from the challenge"
    }
    }) 
}

module.exports = {
    info
}