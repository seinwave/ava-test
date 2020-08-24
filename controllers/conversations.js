const fs = require('fs');

const get_conversations = (req, res) =>{
    let conversations = []
    fs.readdir('./conversations', (err,files) => {
        files.map(file => {
            conversations.push({"id":file})
        })
    return res.status(200).send(conversations)
    })
}

const delete_conversations = (req, res) =>{
    
    console.log(req.body.file)
    const file = req.body.file;
    fs.unlink(`./conversations/${file}`, (err) =>
    {
        if (err){
            console.log(err)
        }
    })

    return res.status(200).send({
        "msg" : "conversation deleted"
    })
    
}


module.exports = {
    get_conversations,
    delete_conversations
}