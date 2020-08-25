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

const new_conversation = (req,res) => {
    const file = req.body.file;
    const filePath = `./conversations/${file}`
    const fileContent = '';

    fs.writeFile(filePath, fileContent, (err) => {
        if (err){
        console.log(err)};
        
        })
}

const rename_conversation = (req, res) =>{
    const file = req.body.file[0].id;
    const oldPath = `./conversations/${file}`
    const newName = req.body.newName;
    const newPath = `./conversations/${newName}`

    fs.rename(oldPath, newPath, (err) => {
        if (err) console.log(err);
    });
}


module.exports = {
    get_conversations,
    delete_conversations,
    new_conversation,
    rename_conversation
}