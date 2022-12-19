const messageControllers = require('./messages.controller');

function getAllMessages(req, res) {
    messageControllers.findAllMessages()
        .then(data => {
                res.status(200).json(data) 
            }
        )
        .catch(err => {
            res.status(404).message({message: err.message});
        })
}

function getMessageById(req, res) {
    const id = req.params.message_id;
    messageControllers.findMessageById(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).message({message: err.message});
        })
}

function postMessage(req, res) {
    const userId = req.user.id;
    const conversationId = req.params.conversation_id;
    const {message} = req.body;

    messageControllers.createMessage({ userId, conversationId, message})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.nessage, fields: {
                message: 'text'
            }})
        })
}

function deleteMessage(req, res) {
    const messageId = req.params.message_id;

    messageControllers.removeMessage(id)
        .then(data => {
            if (data) {
                res.status(204).json()
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).message({message: err.message});
        })
}

module.exports = {
    getAllMessages,
    getMessageById,
    postMessage,
    deleteMessage
}