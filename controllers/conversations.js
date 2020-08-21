const get_conversations = (req, res) =>{
    res.status(200).send({
        "conversations": [
            {
                "id":"string",
                "lastMutation": "Object, last mutation applied",
                "text": "string"
            },
            "..."
        ],
        "message" : "TBD_error_message",
        "ok" : "tbd_boolean"
    })
}

const delete_conversations = (req, res) =>{
    res.status(204).send({
        "msg" : "TBD_error_message",
        "ok" : "tbd_boolean"
    })
    
}


module.exports = {
    get_conversations,
    delete_conversations
}