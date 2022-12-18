const uuid = require('uuid');

const Conversations = require('../models/conversations.models');
const Participants = require('../models/participants.models');
const Users = require('../models/users.models');

async function findAllConversations() {
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data;
}

async function findConversationById(id) {
    const data = await Conversations.findOne({
        where: {
            id: id
        },
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data;
}

async function createConversation(obj) {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imgUrl: obj.imgUrl,
        userId: obj.ownerId //Creador de la conversación
    })
    const participant1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.ownerId, //owner (viene desde el token)
        conversationId: newConversation.id
    })
    const participant2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId, // otro usuario que viene del body
        conversationId: newConversation.id
    })

    return {
        newConversation,
        participant1,
        participant2
    }
}

async function updateConversation(id, obj) {
    const data = await Conversations.update(obj, {
        where: {
            id: id
        }
    })
    return data[0]
    //? [1] se editó algo correctamente (sí encontró el id)
    //? [0] no se editó nada (no encontró el id)
}

async function removeConversation(id) {
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })
    return data
}

module.exports = {
    findAllConversations,
    findConversationById,
    createConversation,
    updateConversation,
    removeConversation
}