const fs = require('fs');

const get_conversations = (req, res) =>{

    let conversations = []
    fs.readdir('./conversations', (err,files) => {
        files.map(file => {
            return conversations.push({"id":file})
        })

    // sure there's a more efficient way of doing this...
    conversations.map((c) => {
        c.content = fs.readFileSync(`./conversations/${c.id}`, 'utf8', (err, data) => { 
            console.log(data)   
            return data;
        })
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
        console.log(err)
        };
    })

    return res.status(200).send({
            "msg" : "conversation created"
    })
}

const rename_conversation = (req, res) =>{
    const file = req.body.file[0].id;
    const oldPath = `./conversations/${file}`
    const newName = req.body.newName;
    const newPath = `./conversations/${newName}.txt`

    fs.rename(oldPath, newPath, (err) => {
        if (err) console.log(err)
    });

    return res.status(200).send({
        "msg" : "conversation renamed"
    })
}


module.exports = {
    get_conversations,
    delete_conversations,
    new_conversation,
    rename_conversation
}