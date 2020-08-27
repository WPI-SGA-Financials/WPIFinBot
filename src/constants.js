import { WebClient} from '@slack/web-api'
import { SLACK_OATH_TOKEN } from "./secrets";

export const BOT_SPAM_CHANNEL = '#bot-spam'
export const DATABASE = 'sgadb'
const web = new WebClient(SLACK_OATH_TOKEN);

export async function sendMessage(channel, message) {
    await web.chat.postMessage({
        channel: channel,
        text : message,
    })
}
