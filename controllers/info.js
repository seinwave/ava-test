const info = (req,res) => {
    res.status(200).send({
    "ok":true, 
    "author": {
        "email": "mseidholz@gmail.com",
        "name": "Matt Seidholz"
    },
    "frontend": {
        "url": "https://seinwave.github.io/ava-frontend/"
    },
    "language": "node.js",
    "sources": {"frontend": "https://github.com/seinwave/ava-frontend",
    "backend": "https://github.com/seinwave/ava-test"},
    "answers": {
        "1": "My approach: Starting from the desired user experience, and working backward from there. Building the backend routes first. Then the front-end interface. Then, focusing the bulk of my time on the algorithm (what I believe to be the hard part).",
        "2": "What I'd add, with more time: I'd throw in some user-specific functionality. So we can know who 'Bob' is, who 'Alice' is — maybe change the names, add some user images, some user-specific vocabularies even? Plus — I'd like to tidy up some loose ends / inefficient code I know is in there.",
        "3": "What I'd remove / add from the challenge: I'd probably split up the Frontend / Backend challenge from the Algorithm challenge. The algorithm challenge is sort of a beast in its own right. And it assesses a very different set of skills from the FE/BE challenge."
    }
    }) 
}

module.exports = {
    info
}