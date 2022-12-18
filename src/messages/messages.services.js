const messageControllers = require('./messages.controller');

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

module.exports = {
    postMessage
}