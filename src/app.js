import { RTMClient } from '@slack/rtm-api'
import { Database } from './database';

const packageJSON = require('../package.json')
const rtm = new RTMClient(process.env.SLACK_OATH_TOKEN);

var constants = require('./constants')
var sqlCommands = require('./sqlcommands')

rtm.start()
    .catch(console.error);

rtm.on('ready', async () => {
    console.log(`bot started`)
    constants.sendMessage(process.env.BOT_SPAM_CHANNEL, `Bot version ${packageJSON.version} online`)
});

rtm.on('slack_event', async (eventType, event) => {
    if(event && event.type === `message`) {
        if (event.text === `!numbers`) {
            var database = new Database()
            sqlCommands.printAllNumbers(database, event.user, event.channel)
        } else if (event.text === `!recents`) {
            var database = new Database()
            sqlCommands.getRecentRequests(database, event.user, event.channel)
        }
    }
});