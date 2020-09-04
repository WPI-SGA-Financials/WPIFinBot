import { WebClient} from '@slack/web-api'

const web = new WebClient(process.env.SLACK_OATH_TOKEN);

export async function sendMessage(channel, message) {
    await web.chat.postMessage({
        channel: channel,
        text : message,
    })
}