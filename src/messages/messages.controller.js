const Messages = require('../models/messages.models')
const uuid = require('uuid')

async function findAllMessages() {
    const data = await Messages.findAll();
    return data;
}

async function findMessageById(id) {
    const data = await Messages.findOne({
        where: {
            id: id
        }
    });
    return data;
}

async function createMessage(obj) {
    const data = await Messages.create({
        id: uuid.v4(),
        userId : obj.userId,
        conversationId: obj.conversationId,
        message: obj.message
    })
    return data
}

async function removeMessage(id) {
    const data = await Messages.destroy({
        where: {
            id: id
        }
    })
    return data;
}

module.exports = {
    findAllMessages,
    findMessageById,
    createMessage,
    removeMessage
}
