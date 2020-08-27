import { RTMClient } from '@slack/rtm-api'
import { SLACK_OATH_TOKEN} from './secrets'
import { Database } from './database';

const packageJSON = require('../package.json')
const rtm = new RTMClient(SLACK_OATH_TOKEN);


var constants = require('./constants')
var sqlCommands = require('./sqlcommands')

var database = new Database()

rtm.start()
    .catch(console.error);

rtm.on('ready', async () => {
    console.log(`bot started`)
    constants.sendMessage(constants.BOT_SPAM_CHANNEL, `Bot version ${packageJSON.version} online`)
});

rtm.on('slack_event', async (eventType, event) => {
    if(event && event.type === `message`) {
        if (event.text === `!numbers`) {
            sqlCommands.printAllNumbers(database, event.user, event.channel)
        } 
    }
});