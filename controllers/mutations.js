const fs = require('fs');

const mutations = (req, res) => {
    const file = req.body.file
    const text = req.body.text
    const filePath = `./conversations/${file}`

    fs.writeFile(filePath, text, (err) => {
        if (err){
        console.log(err)};
        
        })
    return res.status(201).send({
        "msg" : "error_message",
        "ok" : "TBD_boolean",
        "text" : "current_string, post-mutation"
    })
}

module.exports = {
    mutations
}