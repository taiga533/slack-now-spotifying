import * as functions from 'firebase-functions';

export default class SlackConfig {
    static SLACK_TOKEN: string = functions.config().slack.token
    static SPOTIFY_EMOJI_ID: string = ":spotify:"
}