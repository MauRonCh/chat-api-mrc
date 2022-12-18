const Participants = require('../models/participants.models');

async function findParticipantConversations(userId, conversationId) {
    const data = await Participants.findOne({
        where: {
            userId: userId,
            conversationId: conversationId
        }
    })
    return data
}

module.exports = {
    findParticipantConversations
}