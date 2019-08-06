import axios from 'axios'
import SlackConfig from '../configs/SlackConfig';

export default class SlackDAO {
    static async updateStatus(statusText: string) {
        axios.interceptors.request.use(request => {
            console.log(JSON.stringify(request))
            return request
          })
          
        return axios.post(
            "https://slack.com/api/users.profile.set",
            {
                profile: {
                    status_text: statusText,
                    status_emoji: SlackConfig.SPOTIFY_EMOJI_ID
                }
            },
            {
                "headers": {
                    'Authorization': `Bearer ${SlackConfig.SLACK_TOKEN}`,
                    'Content-Type': "application/json"
                }
            }
        )
    }
}